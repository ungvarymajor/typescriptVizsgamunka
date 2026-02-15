// src/decorators/log.ts

// Class decorator
export function LogClass(label?: string) {
    return function <T extends new (...args: any[]) => object>(constructor: T) {
      return class extends constructor {
        constructor(...args: any[]) {
          console.log(`[CLASS] ${label ?? constructor.name} created`);
          super(...args);
        }
      };
    };
  }
  
  // Method decorator
  export function LogMethod(label?: string) {
    return function (
      _target: object,
      propertyKey: string,
      descriptor: PropertyDescriptor
    ) {
      const original = descriptor.value;
  
      descriptor.value = function (...args: any[]) {
        console.log(`[METHOD] ${label ?? propertyKey} called`, args);
        return original.apply(this, args);
      };
  
      return descriptor;
    };
  }
  