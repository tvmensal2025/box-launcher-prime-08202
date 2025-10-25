import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  ShoppingCart,
  Activity,
  Target
} from 'lucide-react';

// Dados de exemplo para os gráficos
const salesData = [
  { month: 'Jan', vendas: 12000, lucro: 8000, clientes: 150 },
  { month: 'Fev', vendas: 15000, lucro: 10000, clientes: 180 },
  { month: 'Mar', vendas: 18000, lucro: 12000, clientes: 220 },
  { month: 'Abr', vendas: 22000, lucro: 15000, clientes: 280 },
  { month: 'Mai', vendas: 25000, lucro: 18000, clientes: 320 },
  { month: 'Jun', vendas: 28000, lucro: 20000, clientes: 350 },
];

const categoryData = [
  { name: 'Streaming', value: 45, color: '#3b82f6' },
  { name: 'Apps', value: 30, color: '#10b981' },
  { name: 'Serviços', value: 15, color: '#f59e0b' },
  { name: 'Outros', value: 10, color: '#ef4444' },
];

const weeklyData = [
  { day: 'Seg', vendas: 4000, lucro: 2800 },
  { day: 'Ter', vendas: 4500, lucro: 3200 },
  { day: 'Qua', vendas: 5000, lucro: 3500 },
  { day: 'Qui', vendas: 4800, lucro: 3300 },
  { day: 'Sex', vendas: 5200, lucro: 3600 },
  { day: 'Sáb', vendas: 6000, lucro: 4200 },
  { day: 'Dom', vendas: 5500, lucro: 3800 },
];

const statsCards = [
  {
    title: 'Vendas Totais',
    value: 'R$ 28.000',
    change: '+12.5%',
    changeType: 'positive' as const,
    icon: DollarSign,
    description: 'vs mês anterior'
  },
  {
    title: 'Lucro Líquido',
    value: 'R$ 20.000',
    change: '+15.2%',
    changeType: 'positive' as const,
    icon: TrendingUp,
    description: 'vs mês anterior'
  },
  {
    title: 'Novos Clientes',
    value: '350',
    change: '+8.3%',
    changeType: 'positive' as const,
    icon: Users,
    description: 'este mês'
  },
  {
    title: 'Taxa de Conversão',
    value: '12.5%',
    change: '+2.1%',
    changeType: 'positive' as const,
    icon: Target,
    description: 'vs mês anterior'
  }
];

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-gradient-to-br from-card to-card/50 border-border/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <span className={`font-medium ${
                    stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {stat.change}
                  </span>
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Gráficos Principais */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Vendas Mensais */}
        <Card className="bg-gradient-to-br from-card to-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Vendas e Lucro Mensal
            </CardTitle>
            <CardDescription>
              Evolução das vendas e lucro nos últimos 6 meses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Bar dataKey="vendas" fill="hsl(var(--primary))" name="Vendas (R$)" />
                <Bar dataKey="lucro" fill="hsl(var(--accent))" name="Lucro (R$)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Gráfico de Distribuição por Categoria */}
        <Card className="bg-gradient-to-br from-card to-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-primary" />
              Vendas por Categoria
            </CardTitle>
            <CardDescription>
              Distribuição percentual das vendas por categoria
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de Tendência Semanal */}
      <Card className="bg-gradient-to-br from-card to-card/50 border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Tendência Semanal
          </CardTitle>
          <CardDescription>
            Vendas e lucro dos últimos 7 dias
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="vendas" 
                stackId="1" 
                stroke="hsl(var(--primary))" 
                fill="hsl(var(--primary) / 0.3)" 
                name="Vendas (R$)"
              />
              <Area 
                type="monotone" 
                dataKey="lucro" 
                stackId="2" 
                stroke="hsl(var(--accent))" 
                fill="hsl(var(--accent) / 0.3)" 
                name="Lucro (R$)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Gráfico de Linha - Crescimento */}
      <Card className="bg-gradient-to-br from-card to-card/50 border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Crescimento de Clientes
          </CardTitle>
          <CardDescription>
            Evolução do número de clientes ao longo dos meses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="clientes" 
                stroke="hsl(var(--success))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--success))', strokeWidth: 2, r: 6 }}
                name="Clientes"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};