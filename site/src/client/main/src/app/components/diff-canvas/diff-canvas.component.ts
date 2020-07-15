import { Component, OnInit, Input } from '@angular/core';
declare var pixelmatch:any;

@Component({
  selector: 'app-diff-canvas',
  templateUrl: './diff-canvas.component.html',
  styleUrls: ['./diff-canvas.component.scss']
})
export class DiffCanvasComponent implements OnInit {

  @Input() content: { localDom: string, existDom: string };
  constructor() { }

  ngOnInit() {
    const newContent = this.content?.localDom;
    const oldContent = this.content?.existDom;
    if (newContent !== '' && oldContent !== '') {
      this.checkDifferent(newContent, oldContent);
    }
  }

  checkDifferent(newContent: string, oldContent: string): void {
    const plotElement = document?.getElementsByTagName('app-plot-viewer-external');
    const iframe = plotElement[0]?.getElementsByTagName('iframe')[0];
    const canvas = document.getElementById('canvasDiff');
    (canvas as any).width = iframe?.clientWidth;
    const ctx =  (canvas as any).getContext('2d');

    const imgOld = new Image();
    const imgNew = new Image();
    let oldData = null;

    imgOld.onload = () => {
        const w = imgOld.width;
        const h = imgOld.height;
        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(imgOld, 0, 0);
        oldData = ctx.getImageData(0, 0, w, h);
    };
    imgNew.onload = () => {
        const w = imgNew.width;
        const h = imgNew.height;
        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(imgNew, 0, 0);
        const imgdata = ctx.getImageData(0, 0, w, h);
       // const newData = imgdata.data;
       // const mergeData = oldData.data;
        // for (let px = 0, ct = w * h * 4; px < ct; px += 1) {
        //     if (mergeData[px] === newData[px]) {
        //         mergeData[px] = 255;
        //     } else {
        //         // tslint:disable-next-line: no-bitwise
        //         mergeData[px] ^= newData[px];
        //     }
        // }
      //  ctx.clearRect(0, 0, w, h);
    //  ctx.putImageData(oldData, 0, 0);
    ctx.clearRect(0, 0, w, h);
    const diff = ctx.createImageData(w, h);
    pixelmatch(oldData.data, imgdata.data, diff.data, w, h, {threshold: 0.1});
    ctx.putImageData(diff, 0, 0);
    };

    imgOld.src = oldContent;
    imgNew.src = newContent;
}

}
