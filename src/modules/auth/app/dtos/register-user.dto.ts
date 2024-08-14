import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';
import { TrimString } from 'src/shared/utils/transformers/trim-string';
import { LowerCase } from 'src/shared/utils/transformers/lower-case';

export class RegisterUserDto {
  @ApiProperty({ required: true, description: 'The user name' })
  @TrimString()
  @IsString()
  name: string;

  @ApiProperty({ required: true, description: 'The user email' })
  @TrimString()
  @LowerCase()
  @IsEmail()
  email: string;

  @ApiProperty({ required: true, description: 'The user password' })
  @IsStrongPassword({ minLength: 8, minLowercase: 1, minNumbers: 1, minSymbols: 1, minUppercase: 1 })
  password: string;
}
