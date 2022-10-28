import { Pipe, PipeTransform } from '@angular/core';
import { Skill } from '../models/skill';

@Pipe({
  name: 'skillFilter',
  pure: false,
})
export class SkillFilterPipe implements PipeTransform {

  transform(items: Skill[], filter: string): any {
    if (!items || !filter) {
      return items;
    }
    return items.filter(item => item.type === filter)

  }

}
