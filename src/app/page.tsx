import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch user hierarchy to determine redirect
  const { data: userData } = await supabase
    .from('usuarios')
    .select('hierarquia_id, cliente_id, hierarquia(nivel, cargo)')
    .eq('email', user.email)
    .single()

  if (!userData) {
    redirect('/login')
  }

  const h = userData.hierarquia as any
  const hierarquia = Array.isArray(h) ? h[0] : h
  const nivel = hierarquia?.nivel || 9

  // Redirect based on hierarchy level
  if (nivel <= 5) {
    redirect('/admin/dashboard')
  } else if (nivel <= 7) {
    // Redirect to their assigned client portal
    const { data: clientData } = await supabase
      .from('clientes')
      .select('nome')
      .eq('id', userData.cliente_id)
      .single()

    if (clientData) {
      redirect(`/${clientData.nome.toLowerCase()}`)
    }
  } else if (nivel === 8) {
    redirect('/instrutor/dashboard')
  } else {
    redirect('/aluno/dashboard')
  }

  return null
}
