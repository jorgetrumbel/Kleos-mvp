import { useState, useEffect } from 'react';
import { SavedPlan, CustomExercise, DEFAULT_PLAN_CATEGORIES, DEFAULT_EXERCISE_CATEGORIES, WorkoutAssignment } from './plan/types';
import { PlanLibrary } from './plan/PlanLibrary';
import { WorkoutPlanner } from './plan/WorkoutPlanner';
import { ExercisesLibrary } from './plan/ExercisesLibrary';

const INITIAL_PLANS: SavedPlan[] = [
  {
    id: 'p1',
    plan: {
      planName: 'Plan Base - Semana 1',
      planNotes: 'Primera semana de entrenamiento base. Foco en aeróbico y técnica básica.',
      blocks: [
        {
          id: 'b1',
          name: 'Calentamiento',
          type: 'Cardio',
          exercises: [
            { id: 'e1', name: 'Caminata Rápida', duration: '10 min', intensity: 'Zona 1', notes: '' },
            { id: 'e2', name: 'Stretching Dinámico', duration: '5 min', intensity: 'Suave', notes: '' },
          ],
          comments: '',
          collapsed: false,
        },
        {
          id: 'b2',
          name: 'Bloque Principal',
          type: 'Cardio',
          exercises: [
            {
              id: 'e3',
              name: 'Carrera Continua',
              duration: '30 min',
              intensity: 'Zona 2',
              notes: 'Mantener FC en zona 2, conversación posible',
            },
          ],
          comments: '',
          collapsed: false,
        },
        {
          id: 'b3',
          name: 'Vuelta a la Calma',
          type: 'Flexibilidad',
          exercises: [
            { id: 'e4', name: 'Foam Roller General', duration: '10 min', intensity: 'Suave', notes: '' },
            { id: 'e5', name: 'Estiramiento Isquiotibiales', duration: '60 seg', intensity: 'Suave', notes: '' },
          ],
          comments: '',
          collapsed: false,
        },
      ],
      files: [],
    },
    planType: 'group',
    category: 'Entrenamiento Base',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: 'p2',
    plan: {
      planName: 'Fuerza - Ciclo 4 Semanas',
      planNotes: 'Ciclo de fuerza con progresión lineal. Aumentar 2.5kg por semana.',
      blocks: [
        {
          id: 'b4',
          name: 'Tren Inferior',
          type: 'Halterofilia',
          exercises: [
            {
              id: 'e6',
              name: 'Sentadilla Trasera',
              sets: '4',
              reps: '8',
              intensity: 'RPE 7',
              notes: 'Profundidad completa, talones en el suelo',
            },
            { id: 'e7', name: 'Peso Muerto Rumano', sets: '3', reps: '10', intensity: 'RPE 7', notes: '' },
            { id: 'e8', name: 'Zancadas', sets: '3', reps: '10', intensity: 'RPE 6', notes: 'Cada pierna' },
          ],
          comments: 'Descanso 3 min entre series pesadas',
          collapsed: false,
        },
        {
          id: 'b5',
          name: 'Core',
          type: 'Halterofilia',
          exercises: [
            { id: 'e9', name: 'Plancha', sets: '3', duration: '60 seg', intensity: 'RPE 6', notes: '' },
            { id: 'e10', name: 'Russian Twist', sets: '3', reps: '20', intensity: 'RPE 5', notes: '' },
          ],
          comments: '',
          collapsed: false,
        },
      ],
      files: [],
    },
    planType: 'single',
    category: 'Entrenamiento de Fuerza',
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-22'),
  },
  {
    id: 'p3',
    plan: {
      planName: 'Preparación 10K',
      planNotes: 'Plan específico para carrera de 10K. 8 semanas de periodización.',
      blocks: [
        {
          id: 'b6',
          name: 'Velocidad e Intervalos',
          type: 'Deporte Específico',
          exercises: [
            {
              id: 'e11',
              name: 'Sprint 100m',
              sets: '8',
              duration: '15 seg',
              intensity: 'Máxima',
              notes: 'Recuperación completa entre series',
            },
            {
              id: 'e12',
              name: 'Escalera de Agilidad',
              sets: '3',
              duration: '3 min',
              intensity: 'Alta',
              notes: '',
            },
          ],
          comments: 'Solo 2x por semana - sesión de alta intensidad',
          collapsed: false,
        },
        {
          id: 'b7',
          name: 'Recuperación Activa',
          type: 'Recuperación',
          exercises: [
            { id: 'e13', name: 'Caminata Suave', duration: '15 min', intensity: 'Muy Baja', notes: '' },
            { id: 'e14', name: 'Foam Rolling Completo', duration: '10 min', intensity: 'Suave', notes: '' },
          ],
          comments: '',
          collapsed: false,
        },
      ],
      files: [],
    },
    planType: 'group',
    category: 'Pico / Preparación Carrera',
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-02-01'),
  },
  {
    id: 'p4',
    plan: {
      planName: 'Semana de Descarga',
      planNotes: 'Recuperación activa post-competencia. Volumen reducido al 40%.',
      blocks: [
        {
          id: 'b8',
          name: 'Movilidad y Recuperación',
          type: 'Recuperación',
          exercises: [
            { id: 'e15', name: 'Yoga Restaurativo', duration: '30 min', intensity: 'Muy Baja', notes: '' },
            { id: 'e16', name: 'Natación Relajada', duration: '20 min', intensity: 'Zona 1', notes: 'Técnica libre, sin cronometrar' },
          ],
          comments: '',
          collapsed: false,
        },
        {
          id: 'b9',
          name: 'Flexibilidad',
          type: 'Flexibilidad',
          exercises: [
            { id: 'e17', name: 'Estiramiento Isquiotibiales', duration: '60 seg', intensity: 'Suave', notes: '' },
            { id: 'e18', name: 'Movilidad de Cadera', duration: '20 min', intensity: 'Suave', notes: '' },
          ],
          comments: '',
          collapsed: false,
        },
      ],
      files: [],
    },
    planType: 'single',
    category: 'Semana de Recuperación',
    createdAt: new Date('2024-02-05'),
    updatedAt: new Date('2024-02-05'),
  },
];

type View = 'library' | 'planner' | 'exercises';

export default function CoachPlan() {
  const [view, setView] = useState<View>('library');
  const [savedPlans, setSavedPlans] = useState<SavedPlan[]>(INITIAL_PLANS);
  const [editingPlan, setEditingPlan] = useState<SavedPlan | null>(null);
  const [customExercises, setCustomExercises] = useState<CustomExercise[]>([]);
  const [planCategories, setPlanCategories] = useState<string[]>(DEFAULT_PLAN_CATEGORIES);
  const [exerciseCategories, setExerciseCategories] = useState<string[]>(DEFAULT_EXERCISE_CATEGORIES);
  const [assignments, setAssignments] = useState<WorkoutAssignment[]>([]);

  // Listen for navigate-exercises event from PlanLibrary
  useEffect(() => {
    const handleNavigateExercises = () => {
      setView('exercises');
    };
    window.addEventListener('navigate-exercises', handleNavigateExercises);
    return () => window.removeEventListener('navigate-exercises', handleNavigateExercises);
  }, []);

  const handleEdit = (plan: SavedPlan) => {
    setEditingPlan(plan);
    setView('planner');
  };

  const handleNew = (planType: 'single' | 'group', category: string) => {
    const newPlan: SavedPlan = {
      id: crypto.randomUUID(),
      plan: { planName: '', planNotes: '', blocks: [], files: [] },
      planType,
      category,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setEditingPlan(newPlan);
    setView('planner');
  };

  const handleSavePlan = (plan: SavedPlan) => {
    setSavedPlans((prev) => {
      const exists = prev.find((p) => p.id === plan.id);
      return exists ? prev.map((p) => (p.id === plan.id ? plan : p)) : [...prev, plan];
    });
    setEditingPlan(null);
    setView('library');
  };

  const handleBack = () => {
    setEditingPlan(null);
    setView('library');
  };

  const handleCreateExercise = (exercise: CustomExercise) => {
    setCustomExercises((prev) => [...prev, exercise]);
  };

  const handleAssignWorkout = (assignment: WorkoutAssignment) => {
    setAssignments((prev) => [...prev, assignment]);
    console.log('Workout assigned:', assignment);
  };

  if (view === 'planner' && editingPlan) {
    return (
      <WorkoutPlanner
        editingPlan={editingPlan}
        onSave={handleSavePlan}
        onBack={handleBack}
        onCreateExercise={handleCreateExercise}
        exerciseCategories={exerciseCategories}
        onSetExerciseCategories={setExerciseCategories}
      />
    );
  }

  if (view === 'exercises') {
    return (
      <ExercisesLibrary
        customExercises={customExercises}
        onSetCustomExercises={setCustomExercises}
        onBack={() => setView('library')}
        exerciseCategories={exerciseCategories}
        onSetExerciseCategories={setExerciseCategories}
      />
    );
  }

  return (
    <PlanLibrary
      plans={savedPlans}
      onSetPlans={setSavedPlans}
      onEdit={handleEdit}
      onNew={handleNew}
      planCategories={planCategories}
      onSetPlanCategories={setPlanCategories}
      onAssignWorkout={handleAssignWorkout}
      assignments={assignments}
    />
  );
}
