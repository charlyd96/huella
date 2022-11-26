import { Pipe, PipeTransform } from '@angular/core';
import { EnumMetadata } from '../../domain/enums/EnumMatadata';

@Pipe({
  name: 'getEnumName'
})
export class GetEnumNamePipe implements PipeTransform {

  transform(value: number, metadata: EnumMetadata[]): string {
    return metadata.find(x => x.value == value)?.displayName || '-';
  }
}
