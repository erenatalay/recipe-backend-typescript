export interface TypeOrmError {
    query: string
    parameters: string[]
    driverError: DriverError
    length: number
    severity: string
    code: string
    detail: string
    schema: string
    table: string
    constraint: string
    file: string
    line: string
    routine: string
  }
  
  export interface DriverError {
    length: number
    name: string
    severity: string
    code: string
    detail: string
    schema: string
    table: string
    constraint: string
    file: string
    line: string
    routine: string
  }
  