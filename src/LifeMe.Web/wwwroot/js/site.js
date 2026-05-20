const menuItems = document.querySelectorAll('.menu-item');
const sections = document.querySelectorAll('.section');
const pageTitle = document.getElementById('pageTitle');
const pageSubtitle = document.getElementById('pageSubtitle');
const sidebar = document.getElementById('sidebar');
const openSidebar = document.getElementById('openSidebar');
const toggleSidebar = document.getElementById('toggleSidebar');
const restoreSidebar = document.getElementById('restoreSidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const themeToggle = document.getElementById('themeToggle');

const today = new Date();
const categoryColors = ['#10b981', '#0ea5e9', '#f59e0b', '#a855f7', '#ef4444', '#14b8a6', '#64748b'];

const state = {
  transactions: [
    createTransaction('Freelance', 1800, 'income', 'Freelance', dateInCurrentMonth(12), 'Projeto avulso'),
    createTransaction('Mercado', 620, 'variable', 'Alimentação', dateInCurrentMonth(8), 'Compra semanal'),
    createTransaction('Combustível', 260, 'variable', 'Transporte', dateInCurrentMonth(11), 'Pagamento avulso')
  ],
  fixedIncomes: [
    createFixedIncome('Salário', 7500, 'Salário', 5)
  ],
  futureIncomes: [
    createFutureIncome('Reembolso equipamento', 450, 'Reembolso', dateInCurrentMonth(24))
  ],
  fixedExpenses: [
    createFixedExpense('Aluguel', 2400, 'Moradia', 5),
    createFixedExpense('Internet', 129.9, 'Moradia', 10),
    createFixedExpense('Academia', 129.9, 'Saúde', 10)
  ],
  installments: [
    createInstallment('Notebook Dell', 4200, 12, dateMonthsAgo(2, 5), 'Eletrônicos'),
    createInstallment('Curso Udemy', 299.4, 6, dateMonthsAgo(5, 10), 'Educação')
  ],
  savingsJars: [
    createSavingsJar('Reserva de emergência', 3200, 5000),
    createSavingsJar('Viagem', 850, 2500)
  ],
  workout: {
    name: 'Peito',
    exercises: [
      createExercise('Supino reto', '4x10', '90s', '40 kg'),
      createExercise('Crucifixo inclinado', '3x12', '60s', '14 kg')
    ]
  },
  categoryRanges: []
};

const pageInfo = {
  dashboard: {
    title: 'Painel Geral',
    subtitle: 'Acompanhe suas finanças, treinos, hábitos e metas em um só lugar.'
  },
  financeiro: {
    title: 'Finanças Pessoais',
    subtitle: 'Gerencie receitas, despesas fixas, variáveis e parcelamentos.'
  },
  academia: {
    title: 'Academia / Exercícios',
    subtitle: 'Acompanhe treino, dieta, bioimpedância, carga e evolução.'
  },
  senhas: {
    title: 'Senhas e Bloco de Notas',
    subtitle: 'Organize acessos, notas privadas e informações importantes.'
  },
  perfil: {
    title: 'Perfil Pessoal',
    subtitle: 'Consulte altura, peso, tipo sanguíneo, idade e dados básicos.'
  },
  listas: {
    title: 'Listas para Check',
    subtitle: 'Acompanhe tarefas, compras e pendências pessoais.'
  },
  calendario: {
    title: 'Calendário e Lembretes',
    subtitle: 'Visualize compromissos, vencimentos e lembretes importantes.'
  },
  configuracoes: {
    title: 'Configurações',
    subtitle: 'Ajuste preferências, categorias e metas do seu app.'
  }
};

menuItems.forEach((item) => {
  item.addEventListener('click', () => {
    showSection(item.dataset.section);
  });
});

document.querySelectorAll('[data-section-shortcut]').forEach((button) => {
  button.addEventListener('click', () => showSection(button.dataset.sectionShortcut));
});

function showSection(target) {
  menuItems.forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.section === target);
  });

  sections.forEach((section) => {
    section.classList.toggle('active', section.id === target);
  });

  pageTitle.textContent = pageInfo[target].title;
  pageSubtitle.textContent = pageInfo[target].subtitle;
  closeSidebar();
}

function createTransaction(description, amount, type, category, date, notes = '') {
  return {
    id: crypto.randomUUID(),
    description,
    amount: Number(amount),
    type,
    category,
    date,
    notes
  };
}

function createFixedExpense(description, amount, category, dueDay) {
  return {
    id: crypto.randomUUID(),
    description,
    amount: Number(amount),
    category,
    dueDay: Number(dueDay)
  };
}

function createFixedIncome(description, amount, category, dueDay) {
  return {
    id: crypto.randomUUID(),
    description,
    amount: Number(amount),
    category,
    dueDay: Number(dueDay)
  };
}

function createFutureIncome(description, amount, category, date) {
  return {
    id: crypto.randomUUID(),
    description,
    amount: Number(amount),
    category,
    date
  };
}

function createInstallment(description, total, count, startDate, category) {
  return {
    id: crypto.randomUUID(),
    description,
    total: Number(total),
    count: Number(count),
    startDate,
    category
  };
}

function createSavingsJar(name, saved, goal) {
  return {
    id: crypto.randomUUID(),
    name,
    saved: Number(saved),
    goal: Number(goal)
  };
}

function createExercise(name, reps, rest, load) {
  return {
    id: crypto.randomUUID(),
    name,
    reps,
    rest,
    load
  };
}

function dateInCurrentMonth(day) {
  return toIsoDate(new Date(today.getFullYear(), today.getMonth(), day));
}

function dateMonthsAgo(months, day) {
  return toIsoDate(new Date(today.getFullYear(), today.getMonth() - months, day));
}

function toIsoDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function parseLocalDate(value) {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function monthKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

function formatCurrency(value) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

function formatDate(value) {
  return parseLocalDate(value).toLocaleDateString('pt-BR');
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function getInstallmentInfo(installment, referenceDate = today) {
  const start = parseLocalDate(installment.startDate);
  const monthDifference = (referenceDate.getFullYear() - start.getFullYear()) * 12 + referenceDate.getMonth() - start.getMonth();
  const currentInstallment = monthDifference + 1;
  const installmentValue = installment.total / installment.count;

  if (currentInstallment < 1) {
    return {
      current: 0,
      paid: 0,
      value: installmentValue,
      remaining: installment.total,
      isActive: false,
      status: 'Agendado',
      progress: 0
    };
  }

  const paid = Math.min(currentInstallment, installment.count);
  const isActive = currentInstallment <= installment.count;
  const remaining = Math.max(installment.total - paid * installmentValue, 0);

  return {
    current: Math.min(currentInstallment, installment.count),
    paid,
    value: installmentValue,
    remaining,
    isActive,
    status: isActive ? 'Ativo' : 'Concluído',
    progress: Math.round((paid / installment.count) * 100)
  };
}

function currentMonthSummary() {
  const currentKey = monthKey(today);
  const variableIncome = state.transactions
    .filter((item) => item.type === 'income' && monthKey(parseLocalDate(item.date)) === currentKey)
    .reduce((sum, item) => sum + item.amount, 0);
  const fixedIncome = state.fixedIncomes.reduce((sum, item) => sum + item.amount, 0);
  const futureIncome = state.futureIncomes
    .filter((item) => monthKey(parseLocalDate(item.date)) === currentKey)
    .reduce((sum, item) => sum + item.amount, 0);
  const variable = state.transactions
    .filter((item) => item.type === 'variable' && monthKey(parseLocalDate(item.date)) === currentKey)
    .reduce((sum, item) => sum + item.amount, 0);
  const fixed = state.fixedExpenses.reduce((sum, item) => sum + item.amount, 0);
  const installments = state.installments.reduce((sum, item) => {
    const info = getInstallmentInfo(item);
    return sum + (info.isActive ? info.value : 0);
  }, 0);
  const savings = state.savingsJars.reduce((sum, item) => sum + item.saved, 0);

  return {
    income: fixedIncome + variableIncome + futureIncome,
    fixedIncome,
    variableIncome,
    futureIncome,
    fixed,
    variable,
    installments,
    savings,
    expenses: fixed + variable + installments,
    balance: fixedIncome + variableIncome + futureIncome - fixed - variable - installments
  };
}

function monthlyData() {
  return Array.from({ length: 6 }, (_, index) => {
    const date = new Date(today.getFullYear(), today.getMonth() - (5 - index), 1);
    const key = monthKey(date);
    const variableIncome = state.transactions
      .filter((item) => item.type === 'income' && monthKey(parseLocalDate(item.date)) === key)
      .reduce((sum, item) => sum + item.amount, 0);
    const fixedIncome = state.fixedIncomes.reduce((sum, item) => sum + item.amount, 0);
    const futureIncome = state.futureIncomes
      .filter((item) => monthKey(parseLocalDate(item.date)) === key)
      .reduce((sum, item) => sum + item.amount, 0);
    const variable = state.transactions
      .filter((item) => item.type === 'variable' && monthKey(parseLocalDate(item.date)) === key)
      .reduce((sum, item) => sum + item.amount, 0);
    const fixed = state.fixedExpenses.reduce((sum, item) => sum + item.amount, 0);
    const installments = state.installments.reduce((sum, item) => {
      const info = getInstallmentInfo(item, date);
      return sum + (info.isActive ? info.value : 0);
    }, 0);

    return {
      label: date.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', ''),
      income: fixedIncome + variableIncome + futureIncome,
      expenses: fixed + variable + installments
    };
  });
}

function categoryData() {
  const currentKey = monthKey(today);
  const totals = new Map();

  state.transactions
    .filter((item) => item.type === 'variable' && monthKey(parseLocalDate(item.date)) === currentKey)
    .forEach((item) => totals.set(item.category, (totals.get(item.category) || 0) + item.amount));

  state.fixedExpenses.forEach((item) => {
    totals.set(item.category, (totals.get(item.category) || 0) + item.amount);
  });

  state.installments.forEach((item) => {
    const info = getInstallmentInfo(item);
    if (info.isActive) {
      totals.set(item.category, (totals.get(item.category) || 0) + info.value);
    }
  });

  return [...totals.entries()]
    .map(([category, amount], index) => ({
      category,
      amount,
      color: categoryColors[index % categoryColors.length]
    }))
    .sort((a, b) => b.amount - a.amount);
}

function renderDashboard() {
  const summary = currentMonthSummary();
  document.getElementById('dashboardIncome').textContent = formatCurrency(summary.income);
  document.getElementById('dashboardExpenses').textContent = formatCurrency(summary.expenses);
  document.getElementById('dashboardBalance').textContent = formatCurrency(summary.balance);
  document.getElementById('financeIncome').textContent = formatCurrency(summary.income);
  document.getElementById('financeTotalExpenses').textContent = formatCurrency(summary.expenses);
  document.getElementById('financeBalance').textContent = formatCurrency(summary.balance);
  document.getElementById('financeSavings').textContent = formatCurrency(summary.savings);
  document.getElementById('financeFixedIncome').textContent = formatCurrency(summary.fixedIncome);
  document.getElementById('financeVariableIncome').textContent = formatCurrency(summary.variableIncome);
  document.getElementById('financeFutureIncome').textContent = formatCurrency(summary.futureIncome);
  document.getElementById('financeFixed').textContent = formatCurrency(summary.fixed);
  document.getElementById('financeVariable').textContent = formatCurrency(summary.variable);
  document.getElementById('financeInstallments').textContent = formatCurrency(summary.installments);

  const totalMovement = Math.max(summary.income + summary.expenses, 1);
  const incomePercent = Math.round((summary.income / totalMovement) * 100);
  const expensePercent = Math.round((summary.expenses / totalMovement) * 100);
  document.getElementById('overviewIncomePercent').textContent = `${incomePercent}%`;
  document.getElementById('overviewExpensePercent').textContent = `${expensePercent}%`;
  document.getElementById('overviewIncomeBar').style.width = `${incomePercent}%`;
  document.getElementById('overviewExpenseBar').style.width = `${expensePercent}%`;

  renderIncomeExpenseChart();
  renderCategoryDonut();
  renderRecentTransactions();
}

function renderIncomeExpenseChart() {
  const chart = document.getElementById('incomeExpenseChart');
  const data = monthlyData();
  const maxValue = Math.max(...data.flatMap((item) => [item.income, item.expenses]), 1);

  chart.innerHTML = `
    <div>
      <div class="chart-grid">
        ${data.map((item) => `
          <div class="month-group">
            <div class="dual-bars">
              <div class="chart-bar income" style="--bar-height:${Math.max((item.income / maxValue) * 100, item.income > 0 ? 4 : 0)}%" title="Receitas: ${formatCurrency(item.income)}"></div>
              <div class="chart-bar expense" style="--bar-height:${Math.max((item.expenses / maxValue) * 100, item.expenses > 0 ? 4 : 0)}%" title="Despesas: ${formatCurrency(item.expenses)}"></div>
            </div>
            <div class="month-label">${item.label}</div>
          </div>
        `).join('')}
      </div>
      <div class="chart-legend">
        <span><i class="dot"></i>Receitas</span>
        <span><i class="dot dot-danger"></i>Despesas</span>
      </div>
    </div>
  `;
}

function renderCategoryDonut() {
  const donut = document.getElementById('categoryDonut');
  const legend = document.getElementById('categoryLegend');
  const totalElement = document.getElementById('categoryTotal');
  const data = categoryData();
  const total = data.reduce((sum, item) => sum + item.amount, 0);

  totalElement.textContent = formatCurrency(total);

  if (!total) {
    state.categoryRanges = [];
    donut.style.background = '#e2e8f0';
    legend.innerHTML = '<div class="empty-state">Nenhuma despesa registrada.</div>';
    return;
  }

  let cursor = 0;
  state.categoryRanges = data.map((item) => {
    const percent = (item.amount / total) * 100;
    const range = {
      ...item,
      percent,
      start: cursor,
      end: cursor + percent
    };
    cursor += percent;
    return range;
  });

  donut.style.background = `conic-gradient(${state.categoryRanges
    .map((item) => `${item.color} ${item.start}% ${item.end}%`)
    .join(', ')})`;

  legend.innerHTML = state.categoryRanges.map((item, index) => `
    <button class="legend-item interactive" type="button" data-category-index="${index}">
      <div class="legend-left"><span class="dot" style="background:${item.color}"></span>${escapeHtml(item.category)}</div>
      <b>${item.percent.toFixed(1)}%</b>
    </button>
  `).join('');
}

function renderRecentTransactions() {
  const tbody = document.getElementById('recentTransactions');
  const currentKey = monthKey(today);
  const rows = [
    ...state.transactions.map((item) => ({
      description: item.description,
      category: item.category,
      date: item.date,
      status: item.type === 'income' ? 'Receita' : 'Variável',
      amount: item.type === 'income' ? item.amount : -item.amount
    })),
    ...state.fixedIncomes.map((item) => ({
      description: item.description,
      category: item.category,
      date: `${currentKey}-${String(item.dueDay).padStart(2, '0')}`,
      status: 'Receita fixa',
      amount: item.amount
    })),
    ...state.futureIncomes.map((item) => ({
      description: item.description,
      category: item.category,
      date: item.date,
      status: 'Recebimento futuro',
      amount: item.amount
    })),
    ...state.fixedExpenses.map((item) => ({
      description: item.description,
      category: item.category,
      date: `${currentKey}-${String(item.dueDay).padStart(2, '0')}`,
      status: 'Fixa',
      amount: -item.amount
    })),
    ...state.installments
      .filter((item) => getInstallmentInfo(item).isActive)
      .map((item) => ({
        description: item.description,
        category: item.category,
        date: dateInCurrentMonth(parseLocalDate(item.startDate).getDate()),
        status: 'Parcelada',
        amount: -getInstallmentInfo(item).value
      }))
  ]
    .sort((a, b) => parseLocalDate(b.date) - parseLocalDate(a.date))
    .slice(0, 8);

  tbody.innerHTML = rows.map((item) => `
    <tr>
      <td>${escapeHtml(item.description)}</td>
      <td>${escapeHtml(item.category)}</td>
      <td>${formatDate(item.date)}</td>
      <td><span class="badge ${item.amount >= 0 ? 'paid' : 'scheduled'}">${item.status}</span></td>
      <td class="${item.amount >= 0 ? 'green' : 'red'}">${item.amount >= 0 ? '+' : '-'} ${formatCurrency(Math.abs(item.amount))}</td>
    </tr>
  `).join('');
}

function renderFinanceLists() {
  renderIncomeLists();
  renderSavingsJars();
  renderVariableExpenses();
  renderFixedMonthList();
  renderInstallmentsMonthList();
  renderInstallments();
  renderWorkoutTable();
}

function renderSavingsJars() {
  const list = document.getElementById('savingsList');
  list.innerHTML = state.savingsJars.length ? state.savingsJars.map((item) => {
    const progress = item.goal > 0 ? Math.min(Math.round((item.saved / item.goal) * 100), 100) : 0;
    return `
      <div class="savings-card">
        <div class="finance-item-top">
          <div>
            <div class="finance-item-title">${escapeHtml(item.name)}</div>
            <div class="finance-item-meta">${formatCurrency(item.saved)} de ${formatCurrency(item.goal)}</div>
          </div>
          <div class="finance-item-value green">${progress}%</div>
        </div>
        <div class="progress-track"><div class="progress-fill" style="width:${progress}%"></div></div>
        <div class="item-actions">
          <button class="btn small danger" type="button" data-action="delete-savings" data-id="${item.id}">Remover</button>
        </div>
      </div>
    `;
  }).join('') : '<div class="empty-state">Nenhum cofrinho criado.</div>';
}

function renderIncomeLists() {
  const fixedList = document.getElementById('fixedIncomeList');
  const variableList = document.getElementById('variableIncomeList');
  const futureList = document.getElementById('futureIncomeList');
  const variableIncomes = state.transactions.filter((item) => item.type === 'income');

  fixedList.innerHTML = state.fixedIncomes.length ? state.fixedIncomes.map((item) => financeItemTemplate({
    id: item.id,
    action: 'delete-fixed-income',
    title: item.description,
    meta: `${item.category} • recebe dia ${item.dueDay}`,
    value: formatCurrency(item.amount),
    valueClass: 'green'
  })).join('') : '<div class="empty-state">Sem receitas fixas.</div>';

  variableList.innerHTML = variableIncomes.length ? variableIncomes.map((item) => financeItemTemplate({
    id: item.id,
    action: 'delete-transaction',
    title: item.description,
    meta: `${item.category} • ${formatDate(item.date)}`,
    value: formatCurrency(item.amount),
    valueClass: 'green'
  })).join('') : '<div class="empty-state">Sem receitas variáveis.</div>';

  futureList.innerHTML = state.futureIncomes.length ? state.futureIncomes.map((item) => financeItemTemplate({
    id: item.id,
    action: 'delete-future-income',
    title: item.description,
    meta: `${item.category} • previsto para ${formatDate(item.date)}`,
    value: formatCurrency(item.amount),
    valueClass: 'green'
  })).join('') : '<div class="empty-state">Sem recebimentos futuros.</div>';
}

function renderVariableExpenses() {
  const list = document.getElementById('variableExpensesList');
  const items = state.transactions.filter((item) => item.type === 'variable');
  list.innerHTML = items.length ? items.map((item) => financeItemTemplate({
    id: item.id,
    action: 'delete-transaction',
    title: item.description,
    meta: `${item.category} • ${formatDate(item.date)}`,
    value: formatCurrency(item.amount),
    valueClass: 'red'
  })).join('') : '<div class="empty-state">Sem despesas variáveis.</div>';
}

function renderFixedMonthList() {
  const list = document.getElementById('fixedMonthList');
  list.innerHTML = state.fixedExpenses.length ? state.fixedExpenses.map((item) => financeItemTemplate({
    id: item.id,
    action: 'delete-fixed',
    title: item.description,
    meta: `${item.category} • previsão mensal`,
    value: formatCurrency(item.amount),
    valueClass: 'red'
  })).join('') : '<div class="empty-state">Sem despesas fixas.</div>';
}

function renderInstallmentsMonthList() {
  const list = document.getElementById('installmentsMonthList');
  const active = state.installments.filter((item) => getInstallmentInfo(item).isActive);
  list.innerHTML = active.length ? active.map((item) => {
    const info = getInstallmentInfo(item);
    return financeItemTemplate({
      id: item.id,
      action: 'delete-installment',
      title: item.description,
      meta: `${item.category} • parcela ${info.current}/${item.count}`,
      value: formatCurrency(info.value),
      valueClass: 'red'
    });
  }).join('') : '<div class="empty-state">Sem parcelas ativas no mês.</div>';
}

function renderInstallments() {
  const list = document.getElementById('installmentsList');

  list.innerHTML = state.installments.length ? state.installments.map((item) => {
    const info = getInstallmentInfo(item);
    return `
      <div class="installment-card">
        <div class="installment-top">
          <div>
            <h3>${escapeHtml(item.description)}</h3>
            <p class="card-subtitle">${escapeHtml(item.category)} • começa em ${formatDate(item.startDate)}</p>
          </div>
          <span class="badge ${info.isActive ? 'scheduled' : 'paid'}">${info.status}</span>
        </div>
        <div class="installment-info">
          <div class="mini-info"><span>Parcela</span><b>${info.current}/${item.count}</b></div>
          <div class="mini-info"><span>Valor</span><b>${formatCurrency(info.value)}</b></div>
          <div class="mini-info"><span>Restante</span><b>${formatCurrency(info.remaining)}</b></div>
        </div>
        <div class="progress-track"><div class="progress-fill" style="width:${info.progress}%"></div></div>
        <div class="item-actions">
          <button class="btn small danger" type="button" data-action="delete-installment" data-id="${item.id}">Remover</button>
        </div>
      </div>
    `;
  }).join('') : '<div class="empty-state">Sem parcelamentos cadastrados.</div>';
}

function renderWorkoutTable() {
  const title = document.getElementById('workoutTableTitle');
  const body = document.getElementById('workoutTableBody');

  if (!title || !body) {
    return;
  }

  title.textContent = state.workout.name || 'Treino';
  body.innerHTML = state.workout.exercises.length ? state.workout.exercises.map((item) => `
    <tr>
      <td contenteditable="true" data-workout-field="name" data-id="${item.id}">${escapeHtml(item.name)}</td>
      <td contenteditable="true" data-workout-field="reps" data-id="${item.id}">${escapeHtml(item.reps)}</td>
      <td contenteditable="true" data-workout-field="rest" data-id="${item.id}">${escapeHtml(item.rest)}</td>
      <td contenteditable="true" data-workout-field="load" data-id="${item.id}">${escapeHtml(item.load)}</td>
      <td><button class="btn small danger" type="button" data-action="delete-exercise" data-id="${item.id}">Remover</button></td>
    </tr>
  `).join('') : `
    <tr>
      <td colspan="5">
        <div class="empty-state">Clique em Criar Treino para adicionar exercícios.</div>
      </td>
    </tr>
  `;
}

function financeItemTemplate({ id, action, title, meta, value, valueClass }) {
  return `
    <div class="finance-item">
      <div class="finance-item-top">
        <div>
          <div class="finance-item-title">${escapeHtml(title)}</div>
          <div class="finance-item-meta">${escapeHtml(meta)}</div>
        </div>
        <div class="finance-item-value ${valueClass}">${value}</div>
      </div>
      <div class="item-actions">
        <button class="btn small danger" type="button" data-action="${action}" data-id="${id}">Remover</button>
      </div>
    </div>
  `;
}

function showCategoryTooltip(item, event) {
  const tooltip = document.getElementById('categoryTooltip');
  const wrap = document.querySelector('.donut-wrap');
  const rect = wrap.getBoundingClientRect();
  const x = event ? event.clientX - rect.left : rect.width / 2;
  const y = event ? event.clientY - rect.top : 28;

  tooltip.style.left = `${Math.min(Math.max(x, 80), rect.width - 80)}px`;
  tooltip.style.top = `${Math.min(Math.max(y - 54, 8), rect.height - 60)}px`;
  tooltip.innerHTML = `<span>${escapeHtml(item.category)} • ${item.percent.toFixed(1)}%</span><b>${formatCurrency(item.amount)}</b>`;
  tooltip.classList.add('show');
}

function hideCategoryTooltip() {
  document.getElementById('categoryTooltip').classList.remove('show');
}

function openMobileSidebar() {
  sidebar.classList.add('open');
  sidebarOverlay.classList.add('open');
  document.body.classList.add('menu-open');
  openSidebar.setAttribute('aria-expanded', 'true');
}

function closeSidebar() {
  sidebar.classList.remove('open');
  sidebarOverlay.classList.remove('open');
  document.body.classList.remove('menu-open');
  openSidebar.setAttribute('aria-expanded', 'false');
}

function applySidebarState(isCollapsed) {
  document.body.classList.toggle('sidebar-collapsed', isCollapsed);
  toggleSidebar.setAttribute('aria-expanded', String(!isCollapsed));
  toggleSidebar.innerHTML = '<span>☰</span><strong>Recolher menu</strong>';
  restoreSidebar.setAttribute('aria-expanded', String(!isCollapsed));
  localStorage.setItem('lifeme-sidebar-collapsed', String(isCollapsed));
}

function refresh() {
  renderDashboard();
  renderFinanceLists();
}

const expenseForm = document.getElementById('expenseForm');
const expenseType = document.getElementById('expenseType');
const expenseDate = document.getElementById('expenseDate');
const expenseDueDay = document.getElementById('expenseDueDay');
const incomeForm = document.getElementById('incomeForm');
const incomeType = document.getElementById('incomeType');
const incomeDate = document.getElementById('incomeDate');
const incomeDueDay = document.getElementById('incomeDueDay');
const incomeFutureDate = document.getElementById('incomeFutureDate');
const installmentForm = document.getElementById('installmentForm');
const installmentStart = document.getElementById('installmentStart');
const financeSegments = document.getElementById('financeSegments');
const toggleFinanceSegments = document.getElementById('toggleFinanceSegments');
const savingsForm = document.getElementById('savingsForm');
const workoutForm = document.getElementById('workoutForm');

expenseDate.value = toIsoDate(today);
incomeDate.value = toIsoDate(today);
incomeFutureDate.value = toIsoDate(today);
installmentStart.value = toIsoDate(today);

function syncExpenseFormFields() {
  const type = expenseType.value;
  document.querySelectorAll('.expense-date-field').forEach((field) => {
    field.hidden = type !== 'variable';
  });
  document.querySelectorAll('.expense-due-field').forEach((field) => {
    field.hidden = type !== 'fixed';
  });

  expenseDate.required = type === 'variable';
  expenseDueDay.required = type === 'fixed';
}

document.getElementById('toggleExpenseForm').addEventListener('click', () => {
  expenseForm.hidden = !expenseForm.hidden;
});

document.getElementById('cancelExpenseForm').addEventListener('click', () => {
  expenseForm.hidden = true;
  expenseForm.reset();
  expenseDate.value = toIsoDate(today);
  syncExpenseFormFields();
});

expenseType.addEventListener('change', syncExpenseFormFields);
syncExpenseFormFields();

toggleFinanceSegments.addEventListener('click', () => {
  financeSegments.hidden = !financeSegments.hidden;
  const isOpen = !financeSegments.hidden;
  toggleFinanceSegments.setAttribute('aria-expanded', String(isOpen));
  toggleFinanceSegments.textContent = isOpen ? 'Ocultar segmentações' : 'Ver segmentações';
});

document.getElementById('toggleSavingsForm').addEventListener('click', () => {
  savingsForm.hidden = !savingsForm.hidden;
});

document.getElementById('cancelSavingsForm').addEventListener('click', () => {
  savingsForm.hidden = true;
  savingsForm.reset();
});

document.getElementById('toggleWorkoutForm').addEventListener('click', () => {
  workoutForm.hidden = !workoutForm.hidden;
});

document.getElementById('cancelWorkoutForm').addEventListener('click', () => {
  workoutForm.hidden = true;
});

document.getElementById('workoutName').addEventListener('input', (event) => {
  state.workout.name = event.target.value.trim() || 'Treino';
  renderWorkoutTable();
});

function syncIncomeFormFields() {
  const type = incomeType.value;
  document.querySelectorAll('.income-date-field').forEach((field) => {
    field.hidden = type !== 'variable';
  });
  document.querySelectorAll('.income-due-field').forEach((field) => {
    field.hidden = type !== 'fixed';
  });
  document.querySelectorAll('.income-future-field').forEach((field) => {
    field.hidden = type !== 'future';
  });

  incomeDate.required = type === 'variable';
  incomeDueDay.required = type === 'fixed';
  incomeFutureDate.required = type === 'future';
}

document.getElementById('toggleIncomeForm').addEventListener('click', () => {
  incomeForm.hidden = !incomeForm.hidden;
});

document.getElementById('cancelIncomeForm').addEventListener('click', () => {
  incomeForm.hidden = true;
  incomeForm.reset();
  incomeDate.value = toIsoDate(today);
  incomeFutureDate.value = toIsoDate(today);
  syncIncomeFormFields();
});

incomeType.addEventListener('change', syncIncomeFormFields);
syncIncomeFormFields();

document.getElementById('toggleInstallmentForm').addEventListener('click', () => {
  installmentForm.hidden = !installmentForm.hidden;
});

document.getElementById('cancelInstallmentForm').addEventListener('click', () => {
  installmentForm.hidden = true;
  installmentForm.reset();
  installmentStart.value = toIsoDate(today);
});

expenseForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const description = document.getElementById('expenseDescription').value.trim();
  const amount = Number(document.getElementById('expenseAmount').value);
  const category = document.getElementById('expenseCategory').value;
  const type = expenseType.value;

  if (!description || !amount) {
    return;
  }

  if (type === 'fixed') {
    state.fixedExpenses.unshift(createFixedExpense(description, amount, category, Number(expenseDueDay.value)));
  }

  if (type === 'variable') {
    state.transactions.unshift(createTransaction(description, amount, 'variable', category, expenseDate.value));
  }

  event.target.reset();
  expenseDate.value = toIsoDate(today);
  syncExpenseFormFields();
  refresh();
});

incomeForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const description = document.getElementById('incomeDescription').value.trim();
  const amount = Number(document.getElementById('incomeAmount').value);
  const category = document.getElementById('incomeCategory').value;
  const type = incomeType.value;

  if (!description || !amount) {
    return;
  }

  if (type === 'fixed') {
    state.fixedIncomes.unshift(createFixedIncome(description, amount, category, Number(incomeDueDay.value)));
  }

  if (type === 'variable') {
    state.transactions.unshift(createTransaction(description, amount, 'income', category, incomeDate.value));
  }

  if (type === 'future') {
    state.futureIncomes.unshift(createFutureIncome(description, amount, category, incomeFutureDate.value));
  }

  event.target.reset();
  incomeDate.value = toIsoDate(today);
  incomeFutureDate.value = toIsoDate(today);
  syncIncomeFormFields();
  refresh();
});

installmentForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const description = document.getElementById('installmentDescription').value.trim();
  const amount = Number(document.getElementById('installmentAmount').value);
  const category = document.getElementById('installmentCategory').value;
  const count = Number(document.getElementById('installmentCount').value);

  if (!description || !amount || !count) {
    return;
  }

  state.installments.unshift(createInstallment(description, amount, count, installmentStart.value, category));
  event.target.reset();
  installmentStart.value = toIsoDate(today);
  refresh();
});

savingsForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('savingsName').value.trim();
  const saved = Number(document.getElementById('savingsSaved').value);
  const goal = Number(document.getElementById('savingsGoal').value);

  if (!name || !goal) {
    return;
  }

  state.savingsJars.unshift(createSavingsJar(name, saved, goal));
  event.target.reset();
  refresh();
});

workoutForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('exerciseName').value.trim();
  const reps = document.getElementById('exerciseReps').value.trim();
  const rest = document.getElementById('exerciseRest').value.trim();
  const load = document.getElementById('exerciseLoad').value.trim();

  if (!name || !reps || !rest || !load) {
    return;
  }

  state.workout.name = document.getElementById('workoutName').value.trim() || state.workout.name;
  state.workout.exercises.push(createExercise(name, reps, rest, load));
  document.getElementById('exerciseName').value = '';
  document.getElementById('exerciseReps').value = '';
  document.getElementById('exerciseRest').value = '';
  document.getElementById('exerciseLoad').value = '';
  renderWorkoutTable();
});

document.body.addEventListener('click', (event) => {
  const button = event.target.closest('[data-action]');

  if (!button) {
    return;
  }

  const { action, id } = button.dataset;

  if (action === 'delete-transaction') {
    state.transactions = state.transactions.filter((item) => item.id !== id);
  }

  if (action === 'delete-fixed') {
    state.fixedExpenses = state.fixedExpenses.filter((item) => item.id !== id);
  }

  if (action === 'delete-fixed-income') {
    state.fixedIncomes = state.fixedIncomes.filter((item) => item.id !== id);
  }

  if (action === 'delete-future-income') {
    state.futureIncomes = state.futureIncomes.filter((item) => item.id !== id);
  }

  if (action === 'delete-installment') {
    state.installments = state.installments.filter((item) => item.id !== id);
  }

  if (action === 'delete-savings') {
    state.savingsJars = state.savingsJars.filter((item) => item.id !== id);
  }

  if (action === 'delete-exercise') {
    state.workout.exercises = state.workout.exercises.filter((item) => item.id !== id);
  }

  refresh();
});

document.body.addEventListener('input', (event) => {
  const cell = event.target.closest('[data-workout-field]');

  if (!cell) {
    return;
  }

  const exercise = state.workout.exercises.find((item) => item.id === cell.dataset.id);

  if (exercise) {
    exercise[cell.dataset.workoutField] = cell.textContent.trim();
  }
});

document.getElementById('categoryDonut').addEventListener('mousemove', (event) => {
  if (!state.categoryRanges.length) {
    return;
  }

  const rect = event.currentTarget.getBoundingClientRect();
  const x = event.clientX - rect.left - rect.width / 2;
  const y = event.clientY - rect.top - rect.height / 2;
  const angle = (Math.atan2(y, x) * 180 / Math.PI + 90 + 360) % 360;
  const percent = angle / 360 * 100;
  const item = state.categoryRanges.find((range) => percent >= range.start && percent <= range.end);

  if (item) {
    showCategoryTooltip(item, event);
  }
});

document.getElementById('categoryDonut').addEventListener('mouseleave', hideCategoryTooltip);

document.getElementById('categoryLegend').addEventListener('mouseover', (event) => {
  const item = event.target.closest('[data-category-index]');

  if (!item) {
    return;
  }

  showCategoryTooltip(state.categoryRanges[Number(item.dataset.categoryIndex)]);
});

document.getElementById('categoryLegend').addEventListener('mouseout', hideCategoryTooltip);

openSidebar.addEventListener('click', () => {
  if (sidebar.classList.contains('open')) {
    closeSidebar();
    return;
  }

  openMobileSidebar();
});

toggleSidebar.addEventListener('click', () => {
  applySidebarState(!document.body.classList.contains('sidebar-collapsed'));
});

restoreSidebar.addEventListener('click', () => {
  applySidebarState(false);
});

sidebarOverlay.addEventListener('click', closeSidebar);

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeSidebar();
  }
});

function applyTheme(theme) {
  const isDark = theme === 'dark';
  document.body.classList.toggle('dark-mode', isDark);
  themeToggle.textContent = isDark ? '☀️ Modo claro' : '🌙 Modo escuro';
  localStorage.setItem('lifeme-theme', theme);
}

themeToggle.addEventListener('click', () => {
  applyTheme(document.body.classList.contains('dark-mode') ? 'light' : 'dark');
});

applyTheme(localStorage.getItem('lifeme-theme') || 'light');
applySidebarState(localStorage.getItem('lifeme-sidebar-collapsed') === 'true');
refresh();
