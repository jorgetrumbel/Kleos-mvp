Overview
A comprehensive coach-athlete workout planning application built with React and Tailwind CSS. The system allows coaches to create, manage, and organize detailed workout plans with multi-level structure (plan → blocks → exercises) and rich media attachments.

Architecture & Main Components
1. Plan Library (PlanLibrary.tsx) - Main Entry Point
The library management interface where users can:

Create new workout plans (specifying single athlete or group plan)
Browse and search existing plans
Filter plans by category (Base Training, Build Phase, Peak/Race Prep, Recovery Week, Strength Training, Other)
Edit, copy, and delete plans
View plan metadata (creation date, block count, file count)
Data Model:

SavedPlan {
  id: string
  plan: WorkoutPlan
  planType: 'single' | 'group'
  category: string
  createdAt: Date
  updatedAt: Date
}
2. Workout Planner (WorkoutPlanner.tsx) - Plan Builder
The core builder interface with:

Plan-level metadata (plan name, notes, attachments)
Plan type indicator badge (single athlete/group)
Category display
File upload capability for plan-level attachments
Blackboard drawing tool integration
Drag-and-drop block reordering
Data Model:

WorkoutPlan {
  planName: string
  planNotes: string
  blocks: Block[]
  files: File[]
}
3. Workout Blocks (WorkoutBlock.tsx, DraggableBlock.tsx)
Container for exercises with:

Block types: Cardio, Weightlifting, Flexibility, Sports Specific, Recovery, Other
Color-coded by type (red=cardio, blue=weightlifting, green=flexibility, purple=sports, yellow=recovery, gray=other)
Collapsible/expandable interface
Block-level comments
Drag handle for reordering
Dynamic field display based on block type
Block Type Configurations:

Cardio: duration, intensity
Weightlifting: sets, reps, intensity
Flexibility: duration, intensity
Sports Specific: sets, reps, duration, intensity (all fields)
Recovery: duration, intensity
Other: sets, reps, duration, intensity (all fields)
4. Exercise Rows (ExerciseRow.tsx)
Individual exercises with:

Smart exercise selector: Searchable dropdown filtered by block type
Add new exercises to library: Users can add custom exercises on-the-fly
Dynamic fields: Only shows relevant fields based on block type (sets, reps, duration, intensity)
Exercise-level comments
Video attachments: Upload file or paste URL (YouTube/Vimeo support)
Action buttons: Add video, add comment, delete exercise
Data Model:

Exercise {
  id: string
  name: string
  sets?: string
  reps?: string
  duration?: string
  intensity?: string
  notes: string
  videoUrl?: string
}
5. Exercise Database (exerciseDatabase.ts)
Pre-populated library with 100+ exercises organized by type:

Cardio: Running, cycling, swimming exercises with zone-based intensity
Weightlifting: Lower body, upper body, core exercises with RPE-based intensity
Flexibility: Yoga, stretching, mobility work
Sports Specific: Plyometrics, agility drills, power training
Recovery: Active recovery, passive recovery modalities
Each exercise template includes default values for relevant fields.

6. Blackboard Drawing Tool (DrawingBoard.tsx)
Interactive canvas-based drawing feature:

Draw mode with color selection (9 colors)
Eraser mode
Adjustable line width (1-20px)
Undo functionality
Clear canvas
Saves as PNG file and attaches to plan
7. Video Player (VideoPlayer.tsx)
Exercise video attachment modal:

Upload video files from computer
Paste URLs from YouTube, Vimeo, or direct video links
Embedded playback for YouTube/Vimeo
HTML5 video player for uploaded files
Video URL stored with exercise data
User Workflow
Creating a New Plan:
Click "New Plan" button in library
Select plan type (single athlete or group)
Choose category (Base Training, Build Phase, etc.)
Opens plan builder with empty state
Building the Plan:
Enter plan name
Add plan-level comments (optional)
Attach files or create blackboard drawings (optional)
Add workout blocks (clicking "Add Workout Block")
Configure each block:
Name the block
Select block type (cardio/weightlifting/etc.)
Add exercises using searchable dropdown
Fill in exercise parameters (sets, reps, duration, intensity based on block type)
Add exercise-level comments (optional)
Attach videos to exercises (optional)
Add block-level comments (optional)
Reorder blocks via drag-and-drop
Save plan (returns to library)
Managing Plans:
Edit: Reopens plan in builder with all data preserved
Copy: Creates duplicate with "(Copy)" suffix, new UUID, clears file attachments
Delete: Removes plan with confirmation dialog
Search: Text filter by plan name
Filter: Category dropdown to view specific plan types
Key Features
Three-Level Comment System:
Plan-level: Overall plan notes (expandable section)
Block-level: Notes about specific workout block (expandable section)
Exercise-level: Form cues, progression notes, rest times (expandable text area)
Intelligent Exercise Management:
Exercises filtered by block type (can't add running to weightlifting block)
Searchable dropdown with autocomplete
Add custom exercises to global database
Default values auto-populated from template
Rich Media Support:
File uploads (any file type) at plan level
Blackboard drawings saved as PNG
Exercise videos via upload or URL
YouTube/Vimeo automatic embed conversion
Data Persistence:
All plans stored in React state (SavedPlan[])
Each entity has unique UUID (plan, block, exercise)
Copy operation deep clones and regenerates IDs
Files stored as File objects
Technical Stack
Framework: React with TypeScript
Styling: Tailwind CSS v4
Icons: Lucide React
Drag & Drop: react-dnd with HTML5 backend
State Management: React useState hooks
Canvas Drawing: HTML5 Canvas API
Visual Design
Clean, modern interface with card-based layouts
Color-coded block types for quick visual identification
Gray-scale neutral base with accent colors for block types
Expandable/collapsible sections to reduce visual clutter
Responsive grid layouts (1 col mobile → 3 col desktop)
Hover states and smooth transitions throughout