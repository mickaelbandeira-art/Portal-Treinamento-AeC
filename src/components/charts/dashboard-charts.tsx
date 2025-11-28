'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'

const performanceData = [
    { month: 'Jan', score: 85 },
    { month: 'Fev', score: 88 },
    { month: 'Mar', score: 92 },
    { month: 'Abr', score: 87 },
    { month: 'Mai', score: 95 },
    { month: 'Jun', score: 93 },
]

const completionData = [
    { name: 'Concluídos', value: 847, color: '#60a5fa' },
    { name: 'Em Andamento', value: 234, color: '#34d399' },
    { name: 'Não Iniciados', value: 166, color: '#fbbf24' },
]

const categoryData = [
    { category: 'Atendimento', alunos: 324 },
    { category: 'Vendas', alunos: 256 },
    { category: 'Técnico', alunos: 189 },
    { category: 'Compliance', alunos: 412 },
    { category: 'Liderança', alunos: 167 },
]

export function DashboardCharts() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Chart */}
            <div className="glass-card p-6">
                <h3 className="text-lg font-semibold mb-4 gradient-text">Desempenho Mensal</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="month" stroke="#888" />
                        <YAxis stroke="#888" />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #60a5fa' }}
                        />
                        <Line
                            type="monotone"
                            dataKey="score"
                            stroke="#60a5fa"
                            strokeWidth={3}
                            dot={{ fill: '#60a5fa', r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Completion Status */}
            <div className="glass-card p-6">
                <h3 className="text-lg font-semibold mb-4 gradient-text">Status de Conclusão</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={completionData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {completionData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #60a5fa' }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Category Distribution */}
            <div className="glass-card p-6 lg:col-span-2">
                <h3 className="text-lg font-semibold mb-4 gradient-text">Alunos por Categoria</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={categoryData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="category" stroke="#888" />
                        <YAxis stroke="#888" />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #60a5fa' }}
                        />
                        <Bar dataKey="alunos" fill="#60a5fa" radius={[8, 8, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
