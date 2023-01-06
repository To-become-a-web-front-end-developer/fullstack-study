import { Exclude } from "class-transformer";
import { IsEmail, Length } from "class-validator"
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Index, OneToMany, BeforeInsert } from "typeorm"

@Entity("users")
export default class User extends BaseEntity {
    @Index()
    @IsEmail(undefined,{message:"메일 주소가 잘못 되었습니다."})
    @Length(1,255,{message:"메일 주소는 변경이 불가합니다."})
    @Column({unique:true})
    email: string;

    @Index()
    @Length(2,32,{message:"사용자 이름은 2자 이상이어야 합니다"})
    @Column({unique:true})
    username: string;

    @Exclude()
    @Column()
    @Length(6,255,{message:"비밀번호는 6자리 이상이어야 합니다."})
    password: string;

    @OneToMany(() => Post,(post) => post.user)
    posts:Post[];

    @OneToMany(() => Vote,(vote) => vote.user)
    votes.Vote[];

    @BeforeInsert()
    async function hashPassword() {
        this.password = await bcrypt.hash(this.password,6);
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number

}
