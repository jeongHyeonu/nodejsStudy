export interface UserDto{
    level:number;
    exp:number;
    job:string,
    name:string;
    createdDt:Date;
    updatedDt?:Date;
}