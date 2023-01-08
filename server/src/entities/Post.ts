import { BaseEntity, Column, Entity, Index } from "typeorm";

@Entity("posts")
export default class Post extends BaseEntity{
    @Index()
    @Column()
    identifier: string;

    @Column()
    title: string;

    @Index()
    @Column()
    slug: string;

    @Column({nullable: true,type:"text"})
    body: string;

    @Column()
    subName: string;

    @Column()
    username: string;
}
