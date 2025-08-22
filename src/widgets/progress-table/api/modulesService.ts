import { type ModuleResponse, moduleStore } from "@/entities/module";

export class ModulesService {
    async getModulesByClass(classId: number): Promise<ModuleResponse[]> {
        console.log("🔧 ModulesService: Запрос модулей для класса:", classId);
        const result = await moduleStore.fetchModulesByClass(classId);
        console.log("🔧 ModulesService: Результат:", result);
        return result;
    }
}

export const modulesService = new ModulesService();
