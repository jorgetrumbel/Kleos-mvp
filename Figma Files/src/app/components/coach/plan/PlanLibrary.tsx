import { useState } from 'react';
import {
  Plus,
  Search,
  Copy,
  Trash2,
  Edit3,
  Users,
  User,
  BookOpen,
  Layers,
  Tag,
  X,
  ChevronRight,
  ChevronDown,
  UserPlus,
  FolderPlus,
} from 'lucide-react';
import { SavedPlan, DEFAULT_PLAN_CATEGORIES, BLOCK_TYPE_CONFIG, WorkoutAssignment } from './types';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { AssignWorkoutModal } from './AssignWorkoutModal';

// Mock athletes data
const MOCK_ATHLETES = [
  { id: 'a1', name: 'Ana Martínez', image: null },
  { id: 'a2', name: 'Carlos Ruiz', image: null },
  { id: 'a3', name: 'Laura González', image: null },
  { id: 'a4', name: 'Diego Fernández', image: null },
  { id: 'a5', name: 'María López', image: null },
  { id: 'a6', name: 'Pedro Sánchez', image: null },
];

interface PlanLibraryProps {
  plans: SavedPlan[];
  onSetPlans: (plans: SavedPlan[]) => void;
  onEdit: (plan: SavedPlan) => void;
  onNew: (planType: 'single' | 'group', category: string) => void;
  planCategories: string[];
  onSetPlanCategories: (categories: string[]) => void;
  onAssignWorkout?: (assignment: WorkoutAssignment) => void;
  assignments?: WorkoutAssignment[];
}

export function PlanLibrary({
  plans,
  onSetPlans,
  onEdit,
  onNew,
  planCategories,
  onSetPlanCategories,
  onAssignWorkout,
  assignments = []
}: PlanLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showNewModal, setShowNewModal] = useState(false);
  const [newPlanType, setNewPlanType] = useState<'single' | 'group'>('single');
  const [newPlanCategory, setNewPlanCategory] = useState(planCategories[0] || DEFAULT_PLAN_CATEGORIES[0]);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [assigningPlan, setAssigningPlan] = useState<SavedPlan | null>(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [deleteCategoryConfirm, setDeleteCategoryConfirm] = useState<string | null>(null);
  const [showNewCategoryInPlanModal, setShowNewCategoryInPlanModal] = useState(false);
  const [newCategoryInPlanModal, setNewCategoryInPlanModal] = useState('');
  const [viewingAssignments, setViewingAssignments] = useState<SavedPlan | null>(null);

  const filtered = plans.filter((p) => {
    const matchSearch = p.plan.planName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
    return matchSearch && matchCat;
  });

  // Group filtered plans by category
  const groupedPlans = filtered.reduce((acc, plan) => {
    const category = plan.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(plan);
    return acc;
  }, {} as Record<string, SavedPlan[]>);

  const sortedCategories = Object.keys(groupedPlans).sort();

  const handleDelete = (id: string) => {
    onSetPlans(plans.filter((p) => p.id !== id));
    setDeleteConfirm(null);
  };

  const handleCopy = (plan: SavedPlan) => {
    const copy: SavedPlan = {
      ...plan,
      id: crypto.randomUUID(),
      plan: {
        ...plan.plan,
        planName: `${plan.plan.planName} (Copia)`,
        blocks: plan.plan.blocks.map((b) => ({
          ...b,
          id: crypto.randomUUID(),
          exercises: b.exercises.map((e) => ({ ...e, id: crypto.randomUUID() })),
        })),
        files: [],
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    onSetPlans([...plans, copy]);
  };

  const handleAddCategory = () => {
    const trimmed = newCategoryName.trim();
    if (!trimmed) return;
    if (planCategories.includes(trimmed)) {
      alert('Esta categoría ya existe');
      return;
    }
    onSetPlanCategories([...planCategories, trimmed]);
    setNewCategoryName('');
    setShowCategoryModal(false);
  };

  const handleAddCategoryFromPlanModal = () => {
    const trimmed = newCategoryInPlanModal.trim();
    if (!trimmed) return;
    if (planCategories.includes(trimmed)) {
      alert('Esta categoría ya existe');
      return;
    }
    onSetPlanCategories([...planCategories, trimmed]);
    setNewPlanCategory(trimmed);
    setNewCategoryInPlanModal('');
    setShowNewCategoryInPlanModal(false);
  };

  const handleDeleteCategory = (category: string) => {
    const plansInCategory = plans.filter((p) => p.category === category);
    if (plansInCategory.length > 0) {
      alert(`No se puede eliminar: hay ${plansInCategory.length} plan(es) en esta categoría`);
      return;
    }
    onSetPlanCategories(planCategories.filter((c) => c !== category));
    setDeleteCategoryConfirm(null);
  };

  const handleAssign = (assignment: WorkoutAssignment) => {
    if (onAssignWorkout) {
      onAssignWorkout(assignment);
    }
    console.log('Workout assigned:', assignment);
  };

  const getAssignedAthletes = (planId: string) => {
    const planAssignments = assignments.filter((a) => a.planId === planId);
    const athleteIds = new Set<string>();
    planAssignments.forEach((assignment) => {
      assignment.athleteIds.forEach((id) => athleteIds.add(id));
    });
    return Array.from(athleteIds).map((id) =>
      MOCK_ATHLETES.find((a) => a.id === id)
    ).filter(Boolean);
  };

  const totalBlocks = plans.reduce((sum, p) => sum + p.plan.blocks.length, 0);
  const uniqueCategories = new Set(plans.map((p) => p.category)).size;

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="p-3 border-b border-border sticky top-0 bg-background z-10">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-xl">Planificación</h1>
            <p className="text-xs text-muted-foreground">Biblioteca de planes de entrenamiento</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                // Navigate to exercises library - will be handled by parent
                const event = new CustomEvent('navigate-exercises');
                window.dispatchEvent(event);
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-muted text-foreground hover:bg-muted/80 transition-colors text-sm flex-shrink-0"
            >
              <BookOpen className="w-4 h-4" /> Ejercicios
            </button>
            <button
              onClick={() => setShowNewModal(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm flex-shrink-0"
            >
              <Plus className="w-4 h-4" /> Nuevo
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-3 pt-3 pb-2">
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Planes', value: plans.length, Icon: BookOpen },
            { label: 'Bloques', value: totalBlocks, Icon: Layers },
            { label: 'Categorías', value: uniqueCategories || 0, Icon: Tag },
          ].map(({ label, value, Icon }) => (
            <div key={label} className="bg-card rounded-xl p-3 border border-border text-center">
              <Icon className="w-4 h-4 text-primary mx-auto mb-1" />
              <p className="text-lg">{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="px-3 pb-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar planes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 bg-input rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
        </div>
      </div>

      {/* Category filter */}
      <div className="px-3 pb-3">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full appearance-none px-3 py-2.5 pr-10 bg-input rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            >
              <option value="all">Todas las categorías</option>
              {planCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
          <button
            onClick={() => setShowCategoryModal(true)}
            className="p-2.5 bg-muted rounded-xl hover:bg-muted/80 transition-colors flex-shrink-0"
            title="Gestionar categorías"
          >
            <FolderPlus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Plans list */}
      <div className="px-3 space-y-4 pb-6">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen className="w-14 h-14 text-muted-foreground mx-auto mb-4 opacity-30" />
            <p className="text-muted-foreground text-sm mb-1">
              {searchQuery ? 'No hay planes que coincidan' : 'No hay planes en esta categoría'}
            </p>
            <p className="text-xs text-muted-foreground opacity-60 mb-4">
              Crea tu primer plan de entrenamiento
            </p>
            <button
              onClick={() => setShowNewModal(true)}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm hover:bg-primary/90 transition-colors"
            >
              Crear plan
            </button>
          </div>
        ) : (
          sortedCategories.map((category) => (
            <div key={category} className="space-y-3">
              {/* Category subtitle */}
              <div className="flex items-center gap-2 px-2">
                <h3 className="text-sm font-medium text-muted-foreground">{category}</h3>
                <div className="h-px flex-1 bg-border"></div>
                <span className="text-xs text-muted-foreground">
                  {groupedPlans[category].length} plan{groupedPlans[category].length !== 1 ? 'es' : ''}
                </span>
              </div>

              {/* Plans in this category */}
              {groupedPlans[category].map((plan) => {
                const blockTypes = [...new Set(plan.plan.blocks.map((b) => b.type))];
                const assignedAthletes = getAssignedAthletes(plan.id);
                return (
                  <div key={plan.id} className="bg-card rounded-xl border border-border overflow-hidden">
                    {/* Plan card — clickable header */}
                    <button
                      onClick={() => onEdit(plan)}
                      className="w-full text-left p-3 hover:bg-muted/10 transition-colors"
                    >
                      <div className="flex items-start gap-2 mb-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium truncate mb-0.5">{plan.plan.planName}</h3>
                          {plan.plan.planNotes && (
                            <p className="text-xs text-muted-foreground line-clamp-1 mb-1">
                              {plan.plan.planNotes}
                            </p>
                          )}
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                      </div>

                      {/* Metadata row */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${
                            plan.planType === 'group'
                              ? 'bg-purple-500/20 text-purple-400'
                              : 'bg-cyan-500/20 text-cyan-400'
                          }`}
                        >
                          {plan.planType === 'group' ? (
                            <Users className="w-3 h-3" />
                          ) : (
                            <User className="w-3 h-3" />
                          )}
                          {plan.planType === 'group' ? 'Grupo' : 'Individual'}
                        </span>
                        {assignedAthletes.length > 0 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setViewingAssignments(plan);
                            }}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
                          >
                            <UserPlus className="w-3 h-3" />
                            {assignedAthletes.length} atleta{assignedAthletes.length !== 1 ? 's' : ''}
                          </button>
                        )}
                        <span className="text-xs text-muted-foreground">
                          {plan.plan.blocks.length} bloq.
                        </span>
                        <span className="text-xs text-muted-foreground ml-auto">
                          {format(plan.updatedAt, 'd MMM', { locale: es })}
                        </span>
                      </div>

                      {/* Block type color indicators */}
                      {blockTypes.length > 0 && (
                        <div className="flex gap-1.5 mt-2">
                          {blockTypes.map((type) => (
                            <span
                              key={type}
                              className={`px-2 py-0.5 rounded-md text-xs ${BLOCK_TYPE_CONFIG[type].bgColor} ${BLOCK_TYPE_CONFIG[type].color}`}
                            >
                              {BLOCK_TYPE_CONFIG[type].label}
                            </span>
                          ))}
                        </div>
                      )}
                    </button>

                    {/* Action bar */}
                    <div className="flex items-center border-t border-border">
                      <button
                        onClick={() => setAssigningPlan(plan)}
                        className="flex-1 py-2 text-xs text-primary hover:bg-primary/5 transition-colors flex items-center justify-center gap-1"
                      >
                        <UserPlus className="w-3.5 h-3.5" /> Asignar
                      </button>
                      <div className="w-px h-8 bg-border" />
                      <button
                        onClick={() => setViewingAssignments(plan)}
                        className={`flex-1 py-2 text-xs transition-colors flex items-center justify-center gap-1 ${
                          assignedAthletes.length > 0
                            ? 'text-primary hover:bg-primary/5'
                            : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                        }`}
                      >
                        <Users className="w-3.5 h-3.5" />
                        Atletas{assignedAthletes.length > 0 ? ` (${assignedAthletes.length})` : ''}
                      </button>
                      <div className="w-px h-8 bg-border" />
                      <button
                        onClick={() => onEdit(plan)}
                        className="flex-1 py-2 text-xs text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors flex items-center justify-center gap-1"
                      >
                        <Edit3 className="w-3.5 h-3.5" /> Editar
                      </button>
                      <div className="w-px h-8 bg-border" />
                      <button
                        onClick={() => handleCopy(plan)}
                        className="flex-1 py-2 text-xs text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors flex items-center justify-center gap-1"
                      >
                        <Copy className="w-3.5 h-3.5" /> Copiar
                      </button>
                      <div className="w-px h-8 bg-border" />
                      <button
                        onClick={() => setDeleteConfirm(plan.id)}
                        className="flex-1 py-2 text-xs text-muted-foreground hover:text-red-400 hover:bg-red-500/5 transition-colors flex items-center justify-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Eliminar
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ))
        )}
      </div>

      {/* New Plan Modal */}
      {showNewModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end">
          <div className="w-full bg-card rounded-t-2xl border-t border-border p-4 space-y-4 max-w-[480px] mx-auto">
            <div className="flex items-center justify-between">
              <h2 className="font-medium">Nuevo Plan</h2>
              <button
                onClick={() => setShowNewModal(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Plan type */}
            <div>
              <label className="text-xs text-muted-foreground mb-2 block">Tipo de plan</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setNewPlanType('single')}
                  className={`py-3 px-4 rounded-xl border transition-colors text-sm flex items-center justify-center gap-2 ${
                    newPlanType === 'single'
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border text-muted-foreground hover:border-primary/40'
                  }`}
                >
                  <User className="w-4 h-4" /> Individual
                </button>
                <button
                  onClick={() => setNewPlanType('group')}
                  className={`py-3 px-4 rounded-xl border transition-colors text-sm flex items-center justify-center gap-2 ${
                    newPlanType === 'group'
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border text-muted-foreground hover:border-primary/40'
                  }`}
                >
                  <Users className="w-4 h-4" /> Grupo
                </button>
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="text-xs text-muted-foreground mb-2 block">Categoría</label>
              {!showNewCategoryInPlanModal ? (
                <div className="space-y-2">
                  <div className="relative">
                    <select
                      value={newPlanCategory}
                      onChange={(e) => setNewPlanCategory(e.target.value)}
                      className="w-full appearance-none px-3 py-2.5 pr-10 bg-input rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    >
                      {planCategories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>
                  <button
                    onClick={() => setShowNewCategoryInPlanModal(true)}
                    className="w-full py-2 px-3 rounded-xl border border-dashed border-border text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" /> Nueva categoría
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Nombre de la nueva categoría..."
                    value={newCategoryInPlanModal}
                    onChange={(e) => setNewCategoryInPlanModal(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddCategoryFromPlanModal()}
                    autoFocus
                    className="w-full px-3 py-2.5 bg-input rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setShowNewCategoryInPlanModal(false);
                        setNewCategoryInPlanModal('');
                      }}
                      className="flex-1 py-2 bg-muted rounded-lg text-sm hover:bg-muted/80 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleAddCategoryFromPlanModal}
                      disabled={!newCategoryInPlanModal.trim()}
                      className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Agregar
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => setShowNewModal(false)}
                className="flex-1 py-3 bg-muted rounded-xl text-sm hover:bg-muted/80 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setShowNewModal(false);
                  onNew(newPlanType, newPlanCategory);
                }}
                className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl text-sm hover:bg-primary/90 transition-colors"
              >
                Crear Plan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-6">
          <div className="bg-card rounded-2xl border border-border p-5 w-full max-w-xs">
            <h3 className="font-medium mb-1">¿Eliminar plan?</h3>
            <p className="text-sm text-muted-foreground mb-4">Esta acción no se puede deshacer.</p>
            <div className="flex gap-2">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2.5 bg-muted rounded-xl text-sm hover:bg-muted/80 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 py-2.5 bg-red-500 text-white rounded-xl text-sm hover:bg-red-600 transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Category management modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end">
          <div className="w-full bg-card rounded-t-2xl border-t border-border max-w-[480px] mx-auto max-h-[80vh] flex flex-col">
            <div className="p-4 border-b border-border flex-shrink-0">
              <div className="flex items-center justify-between">
                <h2 className="font-medium">Gestionar Categorías</h2>
                <button
                  onClick={() => setShowCategoryModal(false)}
                  className="p-2 -mr-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="overflow-y-auto flex-1 p-4 space-y-4">
              {/* Add new category */}
              <div>
                <label className="text-sm font-medium mb-2 block">Nueva categoría</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Nombre de la categoría..."
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
                    className="flex-1 px-3 py-2.5 bg-input rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  />
                  <button
                    onClick={handleAddCategory}
                    disabled={!newCategoryName.trim()}
                    className="px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Agregar
                  </button>
                </div>
              </div>

              {/* Existing categories */}
              <div>
                <label className="text-sm font-medium mb-2 block">Categorías existentes</label>
                <div className="space-y-2">
                  {planCategories.map((category) => {
                    const plansInCategory = plans.filter((p) => p.category === category).length;
                    const isDefault = DEFAULT_PLAN_CATEGORIES.includes(category);
                    return (
                      <div
                        key={category}
                        className="flex items-center justify-between p-3 bg-muted rounded-xl"
                      >
                        <div className="flex-1">
                          <p className="text-sm font-medium">{category}</p>
                          <p className="text-xs text-muted-foreground">
                            {plansInCategory} plan{plansInCategory !== 1 ? 'es' : ''}
                            {isDefault && ' · Predeterminada'}
                          </p>
                        </div>
                        {!isDefault && plansInCategory === 0 && (
                          <button
                            onClick={() => setDeleteCategoryConfirm(category)}
                            className="p-2 text-muted-foreground hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-border flex-shrink-0">
              <button
                onClick={() => setShowCategoryModal(false)}
                className="w-full py-3 bg-muted rounded-xl text-sm hover:bg-muted/80 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete category confirmation */}
      {deleteCategoryConfirm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-6">
          <div className="bg-card rounded-2xl border border-border p-5 w-full max-w-xs">
            <h3 className="font-medium mb-1">¿Eliminar categoría?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Se eliminará "{deleteCategoryConfirm}"
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setDeleteCategoryConfirm(null)}
                className="flex-1 py-2.5 bg-muted rounded-xl text-sm hover:bg-muted/80 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDeleteCategory(deleteCategoryConfirm)}
                className="flex-1 py-2.5 bg-red-500 text-white rounded-xl text-sm hover:bg-red-600 transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assign workout modal */}
      {assigningPlan && (
        <AssignWorkoutModal
          plan={assigningPlan}
          onAssign={handleAssign}
          onClose={() => setAssigningPlan(null)}
        />
      )}

      {/* View assigned athletes modal */}
      {viewingAssignments && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end">
          <div className="w-full bg-card rounded-t-2xl border-t border-border max-w-[480px] mx-auto max-h-[70vh] flex flex-col">
            <div className="p-4 border-b border-border flex-shrink-0">
              <div className="flex items-center justify-between mb-1">
                <h2 className="font-medium">Atletas Asignados</h2>
                <button
                  onClick={() => setViewingAssignments(null)}
                  className="p-2 -mr-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-1">
                {viewingAssignments.plan.planName}
              </p>
            </div>

            <div className="overflow-y-auto flex-1 p-4">
              {(() => {
                const assignedAthletes = getAssignedAthletes(viewingAssignments.id);
                const planAssignments = assignments.filter((a) => a.planId === viewingAssignments.id);

                return assignedAthletes.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-30" />
                    <p className="text-sm text-muted-foreground">
                      No hay atletas asignados a este entrenamiento
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {assignedAthletes.map((athlete) => {
                      if (!athlete) return null;
                      // Find assignments for this athlete
                      const athleteAssignments = planAssignments.filter((a) =>
                        a.athleteIds.includes(athlete.id)
                      );

                      return (
                        <div
                          key={athlete.id}
                          className="bg-muted rounded-xl p-3 space-y-2"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                              <User className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-sm font-medium">{athlete.name}</h3>
                              <p className="text-xs text-muted-foreground">
                                {athleteAssignments.length} asignación{athleteAssignments.length !== 1 ? 'es' : ''}
                              </p>
                            </div>
                          </div>

                          {/* Assignment details */}
                          <div className="space-y-1.5 pl-2 border-l-2 border-border ml-5">
                            {athleteAssignments.map((assignment) => (
                              <div key={assignment.id} className="text-xs space-y-0.5">
                                <div className="flex items-center gap-2">
                                  <span className="text-muted-foreground">Inicio:</span>
                                  <span className="font-medium">
                                    {format(assignment.startDate, 'dd MMM yyyy', { locale: es })}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-muted-foreground">Frecuencia:</span>
                                  <span className="font-medium capitalize">
                                    {assignment.frequency === 'once' && 'Una vez'}
                                    {assignment.frequency === 'daily' && 'Diario'}
                                    {assignment.frequency === 'weekly' && 'Semanal'}
                                    {assignment.frequency === 'custom' && 'Personalizado'}
                                  </span>
                                </div>
                                {assignment.notes && (
                                  <p className="text-muted-foreground italic mt-1">
                                    "{assignment.notes}"
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>

            <div className="p-4 border-t border-border flex-shrink-0">
              <button
                onClick={() => setViewingAssignments(null)}
                className="w-full py-3 bg-muted rounded-xl text-sm hover:bg-muted/80 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
