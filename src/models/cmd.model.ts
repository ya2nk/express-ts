import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("tb_cmd_adms")
export class Cmd extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    sn?: string

    @Column({ name: 'start_date' })
    startDate: Date

    @Column({ name: 'end_date' })
    endDate: Date

    @Column()
    status: number

    @Column({ name: 'input_date' })
    inputDate: Date

    @Column({ name: 'finish_date' })
    finishDate: Date
}