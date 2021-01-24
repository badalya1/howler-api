import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateHowlDto {
  @IsString()
  @MinLength(1, {
    message: 'Howl is too short',
  })
  @MaxLength(360, {
    message: 'Howl is too long',
  })
  public text: string;
}
