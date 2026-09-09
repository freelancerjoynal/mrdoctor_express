export interface PromptOptions {
    title?: string;
    problem?: string;
    location?: string;
    doctors: any[];
    tasks: string[];
}

export function buildDynamicPrompt(options: PromptOptions): string {
    const doctorList = options.doctors
        .map(
            (d) =>
                `ID:${d.id}, Name:${d.name}, Degree:${d.degree || "N/A"}, Speciality:${d.speciality}, Place:${d.workingPlace}, Rating:${d.rating}`
        )
        .join("\n");

    const formattedTasks = options.tasks
        .map((task, index) => `${index + 1}. ${task}`)
        .join("\n");

    return `
${options.title ? `Context: ${options.title}` : ""}
${options.problem ? `Patient's Problem / Symptoms:\n${options.problem}` : ""}
${options.location ? `User Location / Area:\n${options.location}` : ""}

Available Doctors:
${doctorList}

Task / Instructions:
${formattedTasks || "- Select the best matching options and format nicely in Bengali."}
    `.trim();
}