import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2, {
    message: 'Username is too short',
  })
  @MaxLength(30, {
    message: 'Username is too long',
  })
  public username: string;

  @IsString()
  @MinLength(6, {
    message: 'Password is too short',
  })
  @MaxLength(64, {
    message: 'Password is too long',
  })
  public password: string;
}
