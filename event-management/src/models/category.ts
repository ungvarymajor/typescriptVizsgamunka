// src/models/category.ts

export enum Category {
    Process = "process",
    Tools = "tools",
    Method = "method"
  }
  
  export abstract class CategoryInfo {
    constructor(public name: string) {}
  }
  
  export class ProcessInfo extends CategoryInfo {
    constructor(public processArea: string) {
      super(Category.Process);
    }
  }
  
  export class ToolsInfo extends CategoryInfo {
    constructor(public toolName: string) {
      super(Category.Tools);
    }
  }
  
  export class MethodInfo extends CategoryInfo {
    constructor(public methodType: string) {
      super(Category.Method);
    }
  }