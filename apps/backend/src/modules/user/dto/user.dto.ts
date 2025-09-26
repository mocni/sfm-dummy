import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsUUID } from 'class-validator';

export class UserDto {
  @ApiProperty({ example: 'deniss@nesto.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '1f395b6a-0960-4b04-8d99-8581915a8790' })
  @IsUUID()
  id: string;

  @ApiProperty({ example: 'denisTeo' })
  @IsString()
  username: string;
}
