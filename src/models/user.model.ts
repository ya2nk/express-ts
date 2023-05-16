import { BaseEntity, PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity("tb_users")
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number
}