import type { WorkoutTemplatesResponseDTO } from "./dto";

const sortTemplatesByName = (templates: WorkoutTemplatesResponseDTO["templates"]) =>
  [...templates].sort((a, b) => a.name.localeCompare(b.name));

// 템플릿 응답을 UI 표시 안정성을 위해 정렬/정규화한다.
export const normalizeWorkoutTemplates = (
  data: WorkoutTemplatesResponseDTO
): WorkoutTemplatesResponseDTO => ({
  templates: sortTemplatesByName(data.templates),
});
