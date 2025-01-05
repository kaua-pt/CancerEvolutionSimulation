import { Body, Controller, Post } from '@nestjs/common';
import { Cell } from './interfaces/cell.interface';
import { CellGateway } from './cell.gateway';
import { AnalitcsSimulation } from './interfaces/analiticsSimulation.interface';

@Controller('cell')
export class CellController {
  cellList: Cell[] = [];
  cellApoptoseList: Cell[] = [];
  analitcsSimulation: AnalitcsSimulation = null;

  constructor(private cellGateway: CellGateway) {}

  @Post()
  saveCell(@Body() cell: Cell) {
    if (!this.analitcsSimulation) {
      if (!this.cellList.includes(cell)) {
        console.log('division: ', cell);
        this.cellGateway.handleCell(cell, 'division');
      }
    }
  }

  @Post('/apoptose')
  apoptoseCell(@Body() cell: Cell) {
    if (!this.analitcsSimulation) {
      if (!this.cellApoptoseList.includes(cell)) {
        console.log('apoptose: ', cell);
        this.cellGateway.handleCell(cell, 'apoptose');
      }
    }
  }

  @Post('/repair')
  repairCell(@Body() cell: Cell) {
    if (!this.analitcsSimulation) {
      console.log('repair: ', cell);
      this.cellGateway.handleCell(cell, 'repair');
    }
  }

  @Post('/finish-simulation')
  finishSimulation(@Body() analitcs: AnalitcsSimulation) {
    if (!this.analitcsSimulation) {
      console.log(analitcs);
      this.analitcsSimulation = analitcs;
      this.cellGateway.handleCell(null, 'finish', analitcs);
    }
  }
}
