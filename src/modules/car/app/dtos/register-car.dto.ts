import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsString } from 'class-validator';
import { TrimString } from 'src/shared/utils/transformers/trim-string';
import { IsLicense } from 'src/shared/utils/validators/is-license';

export class RegisterCarDto {
  @ApiProperty({ required: true, description: 'The car model' })
  @IsString()
  @TrimString()
  model: string;

  @ApiProperty({ required: true, description: 'The car brand' })
  @IsString()
  @TrimString()
  brand: string;

  @ApiProperty({ required: true, description: 'The car license plate' })
  @TrimString()
  @IsLicense()
  license: string;

  @ApiProperty({ required: true, description: 'The number of kilometers the car has been driven' })
  @IsPositive()
  @IsNumber()
  km: number;

  @ApiProperty({ required: true, description: 'The car minimum price to enter the auction' })
  @IsPositive()
  @IsNumber()
  minimumPrice: number;
}
