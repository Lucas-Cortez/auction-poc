import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { LowerCase } from 'src/shared/utils/transformers/lower-case';
import { TrimString } from 'src/shared/utils/transformers/trim-string';

export class AuthenticateUserDto {
  @ApiProperty({ required: true, description: 'The user email' })
  @TrimString()
  @LowerCase()
  @IsEmail()
  email: string;

  @ApiProperty({ required: true, description: 'The user password' })
  @IsString()
  password: string;
}
