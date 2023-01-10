import { Exclude } from "class-transformer";
import { IsEmail, Length } from "class-validator"
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Index, OneToMany, BeforeInsert } from "typeorm"
import bcrypt from "bcryptjs";

// 데코레이터 클래스는 User 클래스가 Entity임을 나타내는 데 사용된다. CREATE TABLE user 부분과 같다.
@Entity("users")
export default class User extends BaseEntity {
    // 정보를 찾을 때 빨리 찾기 위해 Index를 사용함.
    // 검색의 빈도가 높을 때 사용하기.
    @Index()
    @IsEmail(undefined,{message:"메일 주소가 잘못 되었습니다."})
    @Length(1,255,{message:"메일 주소는 반드시 입력해야 합니다."})
    // 값이 유일해야함.
    @Column({unique:true})
    email: string;

    @Index()
    @Length(2,32,{message:"사용자 이름은 2자 이상이어야 합니다"})
    @Column({unique:true})
    username: string;

    @Exclude()
    @Column()
    @Length(8,255,{message:"비밀번호는 8자리 이상이어야 합니다."})
    password: string;

    // 관계와 관련된 부분 :: 1:N(1대 다)
    @OneToMany(() => Post,(post) => post.user)
    posts:Post[];

    @OneToMany(() => Vote,(vote) => vote.user)
    votes.Vote[];

    @BeforeInsert()
    async function hashPassword() {
        this.password = await bcrypt.hash(this.password,6);
    }

}
