import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('birds')
export class Bird {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    totalbirds: number;

    @Column()
    breedname: string;

    @Column()
    dateAdded: Date;

    @Column()
    university: string;
} 