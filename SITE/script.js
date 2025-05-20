document.addEventListener('DOMContentLoaded', function() {
    // Tab switching
    const calculatorTab = document.getElementById('calculator-tab');
    const resultsTab = document.getElementById('results-tab');
    const calculatorSection = document.getElementById('calculator-section');
    const resultsSection = document.getElementById('results-section');

    calculatorTab.addEventListener('click', function() {
        calculatorTab.classList.add('tab-active');
        resultsTab.classList.remove('tab-active');
        calculatorSection.classList.remove('hidden');
        resultsSection.classList.add('hidden');
    });

    resultsTab.addEventListener('click', function() {
        resultsTab.classList.add('tab-active');
        calculatorTab.classList.remove('tab-active');
        resultsSection.classList.remove('hidden');
        calculatorSection.classList.add('hidden');
    });

    // Form submission
    const healthForm = document.getElementById('health-form');
    const resultsContainer = document.getElementById('results-container');

    healthForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const age = parseInt(document.getElementById('age').value);
        const weight = parseFloat(document.getElementById('weight').value);
        const height = parseInt(document.getElementById('height').value);
        const activity = parseFloat(document.getElementById('activity').value);
        const goal = document.getElementById('goal').value;
        
        // Calculate BMI
        const heightInMeters = height / 100;
        const bmi = weight / (heightInMeters * heightInMeters);
        
        // Calculate BMR (Harris-Benedict equation)
        let bmr;
        if (gender === 'male') {
            bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
        } else {
            bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
        }
        
        // Calculate TDEE (Total Daily Energy Expenditure)
        const tdee = bmr * activity;
        
        // Determine BMI category
        let bmiCategory, bmiColor;
        if (bmi < 18.5) {
            bmiCategory = "Abaixo do peso";
            bmiColor = "text-yellow-500";
        } else if (bmi >= 18.5 && bmi < 25) {
            bmiCategory = "Peso normal";
            bmiColor = "text-green-500";
        } else if (bmi >= 25 && bmi < 30) {
            bmiCategory = "Sobrepeso";
            bmiColor = "text-orange-500";
        } else {
            bmiCategory = "Obesidade";
            bmiColor = "text-red-500";
        }
        
        // Calculate calorie target based on goal
        let calorieTarget;
        if (goal === 'loss') {
            calorieTarget = tdee - 500; // 500 calorie deficit for weight loss
        } else if (goal === 'maintain') {
            calorieTarget = tdee;
        } else {
            calorieTarget = tdee + 500; // 500 calorie surplus for weight gain
        }
        
        // Generate diet plan
        const dietPlan = generateDietPlan(goal, calorieTarget, bmiCategory);
        
        // Generate exercise plan
        const exercisePlan = generateExercisePlan(bmi, goal, gender);
        
        // Display results
        resultsContainer.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="result-card bg-white p-6 rounded-lg shadow-md">
                    <h3 class="text-xl font-semibold mb-4 flex items-center">
                        <i class="fas fa-weight-scale mr-2 text-blue-500"></i> Seu IMC
                    </h3>
                    <div class="text-center py-4">
                        <p class="text-5xl font-bold ${bmiColor}">${bmi.toFixed(1)}</p>
                        <p class="text-lg mt-2">${bmiCategory}</p>
                    </div>
                    <div class="mt-4">
                        <div class="w-full bg-gray-200 rounded-full h-4">
                            <div class="bg-gradient-to-r from-blue-400 to-purple-500 h-4 rounded-full" style="width: ${Math.min(100, (bmi/40)*100)}%"></div>
                        </div>
                        <div class="flex justify-between text-xs text-gray-600 mt-1">
                            <span>18.5</span>
                            <span>25</span>
                            <span>30</span>
                            <span>40+</span>
                        </div>
                    </div>
                </div>
                
                <div class="result-card bg-white p-6 rounded-lg shadow-md">
                    <h3 class="text-xl font-semibold mb-4 flex items-center">
                        <i class="fas fa-fire mr-2 text-orange-500"></i> Sua Taxa Metabólica Basal (TMB)
                    </h3>
                    <div class="text-center py-4">
                        <p class="text-5xl font-bold text-purple-600">${bmr.toFixed(0)}</p>
                        <p class="text-lg mt-2">calorias/dia (em repouso)</p>
                    </div>
                    <div class="mt-4">
                        <p class="font-semibold">Gasto calórico diário (TDEE):</p>
                        <p class="text-2xl font-bold text-blue-600">${tdee.toFixed(0)} calorias</p>
                        <p class="text-sm text-gray-600 mt-1">Baseado no seu nível de atividade</p>
                    </div>
                </div>
            </div>
            
            <div class="result-card bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-xl font-semibold mb-4 flex items-center">
                    <i class="fas fa-utensils mr-2 text-green-500"></i> Plano Alimentar
                </h3>
                <div class="diet-plan pl-4">
                    ${dietPlan}
                </div>
            </div>
            
            <div class="result-card bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-xl font-semibold mb-4 flex items-center">
                    <i class="fas fa-dumbbell mr-2 text-blue-500"></i> Plano de Exercícios
                </h3>
                <div class="exercise-plan pl-4">
                    ${exercisePlan}
                </div>
            </div>
        `;
        
        // Switch to results tab
        resultsTab.click();
    });
});

function generateDietPlan(goal, calorieTarget, bmiCategory) {
    // Calculate macronutrient ratios based on goal
    let proteinRatio, carbRatio, fatRatio;
    
    if (goal === 'loss') {
        proteinRatio = 0.40; // 40% protein
        carbRatio = 0.35;   // 35% carbs
        fatRatio = 0.25;    // 25% fat
    } else if (goal === 'gain') {
        proteinRatio = 0.30; // 30% protein
        carbRatio = 0.50;   // 50% carbs
        fatRatio = 0.20;    // 20% fat
    } else { // maintenance
        proteinRatio = 0.30; // 30% protein
        carbRatio = 0.45;   // 45% carbs
        fatRatio = 0.25;    // 25% fat
    }

    // Calculate macronutrient amounts in grams
    const proteinCalories = calorieTarget * proteinRatio;
    const carbCalories = calorieTarget * carbRatio;
    const fatCalories = calorieTarget * fatRatio;

    const proteinGrams = Math.round(proteinCalories / 4); // 4 calories per gram of protein
    const carbGrams = Math.round(carbCalories / 4);      // 4 calories per gram of carbs
    const fatGrams = Math.round(fatCalories / 9);        // 9 calories per gram of fat

    let plan = '';
    
    if (goal === 'loss') {
        plan = `
            <p class="mb-4">Para atingir seu objetivo de perda de peso, siga estas diretrizes:</p>
            <div class="bg-blue-50 p-4 rounded-lg mb-4">
                <h4 class="font-semibold text-lg mb-2">Distribuição de Macronutrientes:</h4>
                <ul class="space-y-2">
                    <li><span class="font-medium">Proteínas:</span> ${proteinGrams}g (${Math.round(proteinCalories)} calorias/dia)</li>
                    <li><span class="font-medium">Carboidratos:</span> ${carbGrams}g (${Math.round(carbCalories)} calorias/dia)</li>
                    <li><span class="font-medium">Gorduras:</span> ${fatGrams}g (${Math.round(fatCalories)} calorias/dia)</li>
                    <li><span class="font-medium">Total:</span> ${calorieTarget.toFixed(0)} calorias/dia</li>
                </ul>
            </div>
            <ul class="list-disc pl-6 space-y-2">
                <li>Priorize proteínas magras (frango, peixe, ovos)</li>
                <li>Inclua vegetais em todas as refeições</li>
                <li>Reduza carboidratos refinados e açúcares</li>
                <li>Beba muita água (2-3 litros por dia)</li>
            </ul>
        `;
    } else if (goal === 'maintain') {
        plan = `
            <p class="mb-4">Para manter seu peso atual, siga estas diretrizes:</p>
            <div class="bg-blue-50 p-4 rounded-lg mb-4">
                <h4 class="font-semibold text-lg mb-2">Distribuição de Macronutrientes:</h4>
                <ul class="space-y-2">
                    <li><span class="font-medium">Proteínas:</span> ${proteinGrams}g (${Math.round(proteinCalories)} calorias/dia)</li>
                    <li><span class="font-medium">Carboidratos:</span> ${carbGrams}g (${Math.round(carbCalories)} calorias/dia)</li>
                    <li><span class="font-medium">Gorduras:</span> ${fatGrams}g (${Math.round(fatCalories)} calorias/dia)</li>
                    <li><span class="font-medium">Total:</span> ${calorieTarget.toFixed(0)} calorias/dia</li>
                </ul>
            </div>
            <ul class="list-disc pl-6 space-y-2">
                <li>Mantenha uma dieta balanceada com proteínas, carboidratos e gorduras saudáveis</li>
                <li>Inclua frutas e vegetais em todas as refeições</li>
                <li>Mantenha-se hidratado (2-3 litros de água por dia)</li>
            </ul>
        `;
    } else {
        plan = `
            <p class="mb-4">Para ganho de peso/massa muscular, siga estas diretrizes:</p>
            <div class="bg-blue-50 p-4 rounded-lg mb-4">
                <h4 class="font-semibold text-lg mb-2">Distribuição de Macronutrientes:</h4>
                <ul class="space-y-2">
                    <li><span class="font-medium">Proteínas:</span> ${proteinGrams}g (${Math.round(proteinCalories)} calorias/dia)</li>
                    <li><span class="font-medium">Carboidratos:</span> ${carbGrams}g (${Math.round(carbCalories)} calorias/dia)</li>
                    <li><span class="font-medium">Gorduras:</span> ${fatGrams}g (${Math.round(fatCalories)} calorias/dia)</li>
                    <li><span class="font-medium">Total:</span> ${calorieTarget.toFixed(0)} calorias/dia</li>
                </ul>
            </div>
            <ul class="list-disc pl-6 space-y-2">
                <li>Aumente a ingestão de proteínas (1.6-2.2g por kg de peso)</li>
                <li>Inclua carboidratos complexos em todas as refeições</li>
                <li>Adicione gorduras saudáveis (abacate, azeite, castanhas)</li>
                <li>Faça 5-6 refeições por dia</li>
            </ul>
        `;
    }
    
    return plan;
}

function generateExercisePlan(bmi, goal, gender) {
    // Define exercise categories
    const cardioExercises = {
        low: [
            { name: "Caminhada", details: "20-30 minutos em ritmo moderado" },
            { name: "Hidroginástica", details: "30 minutos" },
            { name: "Bicicleta ergométrica", details: "20-25 minutos em ritmo leve" },
            { name: "Elíptico", details: "15-20 minutos em intensidade baixa" }
        ],
        medium: [
            { name: "Corrida leve", details: "30-45 minutos em ritmo moderado" },
            { name: "Natação", details: "45 minutos em ritmo moderado" },
            { name: "Ciclismo", details: "45-60 minutos em terreno plano" },
            { name: "Pular corda", details: "20-30 minutos com intervalos" }
        ],
        high: [
            { name: "HIIT", details: "30-45 minutos (30s intenso / 30s descanso)" },
            { name: "Corrida intervalada", details: "45-60 minutos com sprints" },
            { name: "Spinning", details: "60-75 minutos com variações de intensidade" },
            { name: "Treino Tabata", details: "20-30 minutos por exercício, 8 rodadas" }
        ]
    };

    const strengthExercises = {
        upper: [
            { name: "Flexões", details: "3 séries de 10-15 repetições (pode ser feito com joelhos no chão se necessário)" },
            { name: "Flexões Diamante", details: "3 séries de 8-12 repetições (foco em tríceps)" },
            { name: "Flexões Inclinadas", details: "3 séries de 12-15 repetições (use uma cadeira ou sofá para elevar os pés)" },
            { name: "Remada com Garrafa de Água", details: "3 séries de 12 repetições cada braço (use garrafas de 1-2L)" },
            { name: "Desenvolvimento com Garrafas", details: "3 séries de 12 repetições (use garrafas de água como peso)" },
            { name: "Tríceps Banco", details: "3 séries de 12 repetições (use uma cadeira ou sofá)" }
        ],
        lower: [
            { name: "Agachamento Livre", details: "3 séries de 15-20 repetições" },
            { name: "Agachamento Sumô", details: "3 séries de 12-15 repetições (pés mais abertos)" },
            { name: "Afundo", details: "3 séries de 10 repetições cada perna" },
            { name: "Elevação Pélvica", details: "3 séries de 15 repetições" },
            { name: "Agachamento Búlgaro", details: "3 séries de 10 repetições cada perna (use uma cadeira para apoiar o pé)" },
            { name: "Ponte Glúteo", details: "3 séries de 15 repetições (pode adicionar peso com mochila)" }
        ],
        core: [
            { name: "Prancha Frontal", details: "3 séries de 30-60 segundos" },
            { name: "Prancha Lateral", details: "3 séries de 30 segundos cada lado" },
            { name: "Abdominal Crunch", details: "3 séries de 15-20 repetições" },
            { name: "Abdominal Bicicleta", details: "3 séries de 12 repetições cada lado" },
            { name: "Superman", details: "3 séries de 12 repetições" },
            { name: "Ponte com Elevação de Perna", details: "3 séries de 10 repetições cada perna" }
        ],
        fullBody: [
            { name: "Burpee", details: "3 séries de 8-12 repetições" },
            { name: "Mountain Climber", details: "3 séries de 30 segundos" },
            { name: "Polichinelo", details: "3 séries de 30 segundos" },
            { name: "Agachamento com Salto", details: "3 séries de 12 repetições" },
            { name: "Flexão com Rotação", details: "3 séries de 8 repetições cada lado" },
            { name: "Prancha com Toque no Ombro", details: "3 séries de 10 repetições cada lado" }
        ]
    };

    const flexibilityExercises = [
        { name: "Alongamento geral", details: "10-15 minutos de alongamento dinâmico" },
        { name: "Yoga básico", details: "20-30 minutos de posturas básicas" },
        { name: "Mobilidade articular", details: "10 minutos de exercícios de mobilidade" },
        { name: "Alongamento estático", details: "15 minutos após o treino" }
    ];

    // Determine intensity based on BMI and goal
    let cardioIntensity, strengthFocus;
    if (bmi >= 30) {
        cardioIntensity = 'high';
        strengthFocus = 'core';
    } else if (bmi >= 25) {
        cardioIntensity = 'medium';
        strengthFocus = 'fullBody';
    } else {
        cardioIntensity = 'low';
        strengthFocus = 'upper', "lower";
    } 
    // Ajusta a duração dos exercícios baseado no nível de atividade
    const activityLevel = parseFloat(document.getElementById('activity').value);
    let exerciseDuration;
    if (activityLevel <= 1.2) {
        exerciseDuration = 0.7; // 70% da duração normal
    } else if (activityLevel <= 1.375) {
        exerciseDuration = 0.85; // 85% da duração normal
    } else if (activityLevel <= 1.55) {
        exerciseDuration = 1; // duração normal
    } else if (activityLevel <= 1.725) {
        exerciseDuration = 1.15; // 115% da duração normal
    } else {
        exerciseDuration = 1.3; // 130% da duração normal
    }

    // Ajusta a duração dos exercícios
    Object.keys(cardioExercises).forEach(intensity => {
        cardioExercises[intensity].forEach(exercise => {
            if (exercise.details.includes("minutos")) {
                const duration = parseInt(exercise.details.match(/\d+/)[0]);
                const newDuration = Math.round(duration * exerciseDuration);
                exercise.details = exercise.details.replace(/\d+/, newDuration);
            }
        });
    });

    // Generate plan based on goal
    let plan = '';
    
    if (goal === 'loss') {
        plan = `
            <p class="mb-4">Plano de exercícios para perda de peso:</p>
            
            <div class="mb-6">
                <h4 class="font-semibold text-lg mb-2 text-blue-600">Exercícios Cardio (${cardioIntensity === 'low' ? 'Baixa' : cardioIntensity === 'medium' ? 'Média' : 'Alta'} Intensidade):</h4>
                <ul class="list-disc pl-6 space-y-2">
                    ${cardioExercises[cardioIntensity].map(ex => `
                        <li class="flex items-start">
                            <i class="fas fa-heartbeat text-red-500 mt-1 mr-2"></i>
                            <div>
                                <p class="font-medium">${ex.name}</p>
                                <p class="text-sm text-gray-600">${ex.details}</p>
                            </div>
                        </li>
                    `).join('')}
                </ul>
            </div>

            <div class="mb-6">
                <h4 class="font-semibold text-lg mb-2 text-green-600">Treino de Força:</h4>
                <ul class="list-disc pl-6 space-y-2">
                    ${strengthExercises[strengthFocus].map(ex => `
                        <li class="flex items-start">
                            <i class="fas fa-dumbbell text-green-500 mt-1 mr-2"></i>
                            <div>
                                <p class="font-medium">${ex.name}</p>
                                <p class="text-sm text-gray-600">${ex.details}</p>
                            </div>
                        </li>
                    `).join('')}
                </ul>
            </div>

            <div class="mb-6">
                <h4 class="font-semibold text-lg mb-2 text-purple-600">Flexibilidade e Recuperação:</h4>
                <ul class="list-disc pl-6 space-y-2">
                    ${flexibilityExercises.map(ex => `
                        <li class="flex items-start">
                            <i class="fas fa-child text-purple-500 mt-1 mr-2"></i>
                            <div>
                                <p class="font-medium">${ex.name}</p>
                                <p class="text-sm text-gray-600">${ex.details}</p>
                            </div>
                        </li>
                    `).join('')}
                </ul>
            </div>

            <div class="bg-blue-50 p-4 rounded-lg">
                <h4 class="font-semibold mb-2">Recomendações:</h4>
                <ul class="list-disc pl-6 space-y-1 text-sm">
                    <li>Realize cardio 4-5 vezes por semana</li>
                    <li>Faça treino de força 2-3 vezes por semana</li>
                    <li>Inclua alongamento após cada treino</li>
                    <li>Mantenha-se hidratado durante os exercícios</li>
                    <li>Descanse 1-2 dias por semana</li>
                </ul>
            </div>
        `;
    } else if (goal === 'gain') {
        plan = `
            <p class="mb-4">Plano de exercícios para ganho de massa muscular:</p>
            
            <div class="mb-6">
                <h4 class="font-semibold text-lg mb-2 text-blue-600">Treino de Força (4-5 vezes por semana):</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h5 class="font-medium mb-2">Treino A (Peito/Tríceps):</h5>
                        <ul class="list-disc pl-6 space-y-2">
                            ${strengthExercises.upper.slice(0, 2).map(ex => `
                                <li class="flex items-start">
                                    <i class="fas fa-dumbbell text-blue-500 mt-1 mr-2"></i>
                                    <div>
                                        <p class="font-medium">${ex.name}</p>
                                        <p class="text-sm text-gray-600">${ex.details}</p>
                                    </div>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                    <div>
                        <h5 class="font-medium mb-2">Treino B (Costas/Bíceps):</h5>
                        <ul class="list-disc pl-6 space-y-2">
                            ${strengthExercises.upper.slice(2, 4).map(ex => `
                                <li class="flex items-start">
                                    <i class="fas fa-dumbbell text-blue-500 mt-1 mr-2"></i>
                                    <div>
                                        <p class="font-medium">${ex.name}</p>
                                        <p class="text-sm text-gray-600">${ex.details}</p>
                                    </div>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
            </div>

            <div class="mb-6">
                <h4 class="font-semibold text-lg mb-2 text-green-600">Cardio Leve (2-3 vezes por semana):</h4>
                <ul class="list-disc pl-6 space-y-2">
                    ${cardioExercises.low.map(ex => `
                        <li class="flex items-start">
                            <i class="fas fa-heartbeat text-green-500 mt-1 mr-2"></i>
                            <div>
                                <p class="font-medium">${ex.name}</p>
                                <p class="text-sm text-gray-600">${ex.details}</p>
                            </div>
                        </li>
                    `).join('')}
                </ul>
            </div>

            <div class="bg-blue-50 p-4 rounded-lg">
                <h4 class="font-semibold mb-2">Recomendações para Hipertrofia:</h4>
                <ul class="list-disc pl-6 space-y-1 text-sm">
                    <li>Treine cada grupo muscular 2 vezes por semana</li>
                    <li>Mantenha o cardio leve para não interferir no ganho de massa</li>
                    <li>Descanse 48-72 horas entre treinos do mesmo grupo muscular</li>
                    <li>Mantenha-se hidratado e bem alimentado</li>
                    <li>Priorize a técnica correta dos exercícios</li>
                </ul>
            </div>
        `;
    } else { // maintenance
        plan = `
            <p class="mb-4">Plano de exercícios para manutenção:</p>
            
            <div class="mb-6">
                <h4 class="font-semibold text-lg mb-2 text-blue-600">Treino Full Body (3 vezes por semana):</h4>
                <ul class="list-disc pl-6 space-y-2">
                    ${strengthExercises.fullBody.map(ex => `
                        <li class="flex items-start">
                            <i class="fas fa-dumbbell text-blue-500 mt-1 mr-2"></i>
                            <div>
                                <p class="font-medium">${ex.name}</p>
                                <p class="text-sm text-gray-600">${ex.details}</p>
                            </div>
                        </li>
                    `).join('')}
                </ul>
            </div>

            <div class="mb-6">
                <h4 class="font-semibold text-lg mb-2 text-green-600">Exercícios Complementares:</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h5 class="font-medium mb-2">Força:</h5>
                        <ul class="list-disc pl-6 space-y-2">
                            ${[...strengthExercises.upper.slice(0, 2), ...strengthExercises.lower.slice(0, 2)].map(ex => `
                                <li class="flex items-start">
                                    <i class="fas fa-dumbbell text-green-500 mt-1 mr-2"></i>
                                    <div>
                                        <p class="font-medium">${ex.name}</p>
                                        <p class="text-sm text-gray-600">${ex.details}</p>
                                    </div>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                    <div>
                        <h5 class="font-medium mb-2">Core:</h5>
                        <ul class="list-disc pl-6 space-y-2">
                            ${strengthExercises.core.slice(0, 3).map(ex => `
                                <li class="flex items-start">
                                    <i class="fas fa-dumbbell text-green-500 mt-1 mr-2"></i>
                                    <div>
                                        <p class="font-medium">${ex.name}</p>
                                        <p class="text-sm text-gray-600">${ex.details}</p>
                                    </div>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
            </div>

            <div class="mb-6">
                <h4 class="font-semibold text-lg mb-2 text-purple-600">Flexibilidade (2-3 vezes por semana):</h4>
                <ul class="list-disc pl-6 space-y-2">
                    ${flexibilityExercises.map(ex => `
                        <li class="flex items-start">
                            <i class="fas fa-child text-purple-500 mt-1 mr-2"></i>
                            <div>
                                <p class="font-medium">${ex.name}</p>
                                <p class="text-sm text-gray-600">${ex.details}</p>
                            </div>
                        </li>
                    `).join('')}
                </ul>
            </div>

            <div class="bg-blue-50 p-4 rounded-lg">
                <h4 class="font-semibold mb-2">Recomendações para Manutenção:</h4>
                <ul class="list-disc pl-6 space-y-1 text-sm">
                    <li>Mantenha uma rotina consistente de exercícios</li>
                    <li>Varie os exercícios a cada 4-6 semanas</li>
                    <li>Inclua tanto cardio quanto treino de força</li>
                    <li>Priorize a qualidade do movimento</li>
                    <li>Descanse adequadamente entre os treinos</li>
                    <li>Use objetos domésticos como pesos (garrafas de água, mochilas com livros)</li>
                </ul>
            </div>
        `;
    }
    
    return plan;
} 