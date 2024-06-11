import './style.css'

// 创建黑板类
class BlackBloard {
  // 在constructor中使用public等直接声明类属性，而不是成为形参（不需要再去外面定义通过this去挂到类对象中）
  constructor(
    public el = document.querySelector<HTMLCanvasElement>('#canvas')!,
    public canvas = el.getContext('2d')!,
    public width = el.width,
    public height = el.height,
    private btnCont: HTMLDivElement = document.createElement('div'), // 按钮容器
    private bgColor = "#2c3e50", // 黑板背景颜色
    private lineColor = '#fff', // 画笔颜色
  ) {
    // 初始化黑板
    this.initCanvas();
    // 监听写字
    this.bindEvents();
    this.draw();
  }
  private bindEvents(): void {
    const callBack = this.drawLine.bind(this); // 使用bind会创建一个函数，必须手动调用，将函数this指向指定对象
    // 绑定鼠标按下事件写字
    this.el.addEventListener('mousedown', () => {
      this.canvas.beginPath(); // 按下时重新开始画
      this.canvas.strokeStyle = this.lineColor; // 线条颜料
      // 鼠标移动事件，画线
      this.el.addEventListener('mousemove', callBack)
      // 移除鼠标移动事件，当鼠标抬起的时候,使用document对象是不在el节点上抬起鼠标时移除不成功
      document.addEventListener('mouseup', () => {
        this.el.removeEventListener('mousemove', callBack);
      })
    })
  }
  private drawLine(e: MouseEvent): void {
    // 鼠标移动画线事件
    this.canvas.lineTo(e.offsetX, e.offsetY); // 根据鼠标移动的位置画线
    this.canvas.stroke();
  }
  // 添加清除画布函数
  public clear() {
    // 添加按钮
    const btn = document.createElement('button');
    btn.innerHTML = '清除';
    this.btnCont.insertAdjacentElement('afterbegin', btn);
    // 添加清除画布点击事件
    btn.addEventListener('click', () => {
      this.canvas.fillStyle = this.bgColor;
      this.canvas.fillRect(0, 0, this.width, this.height);
    })
    return this;
  }
  // 修改黑板背景颜色
  public setBgColor(color: string) {
    this.bgColor = color;
    this.canvas.fillStyle = this.bgColor;
    this.canvas.fillRect(0, 0, this.width, this.height);
    return this; // 方便外部链式操作函数
  }

  // 修改画笔颜色
  public setLineColor() {
    const color = ['#1abc9c', '#3498db', '#f1c40f', '#e74c3c'];
    const container = document.createElement('div');
    container.classList.add('color-container');
    color.forEach(item => {
      const div = document.createElement('div');
      div.classList.add('color-container-box');
      div.style.cssText = `width:20px;height:20px;background:${item}`
      container.insertAdjacentElement('afterbegin', div);
      div.addEventListener('click', () => {
        this.lineColor = item;
      })
    });
    this.btnCont.insertAdjacentElement('beforebegin', container)
    return this;
  }
  // 橡皮擦
  public eraser() {
    // 添加按钮
    const btn = document.createElement('button');
    btn.innerHTML = '橡皮';
    this.btnCont.insertAdjacentElement('afterbegin', btn);
    // 添加清除画布点击事件
    btn.addEventListener('click', () => {
      this.lineColor = this.bgColor;
      this.canvas.lineWidth = 10;
    })
    return this;
  }
  // 重新写功能
  public draw() {
    // 添加按钮
    const btn = document.createElement('button');
    btn.innerHTML = '写字';
    this.btnCont.insertAdjacentElement('afterbegin', btn);
    // 添加清除画布点击事件
    btn.addEventListener('click', () => {
      this.lineColor = 'white';
      this.canvas.lineWidth = 1;
    })
    return this;
  }
  // 截图功能
  public show() {
    // 添加按钮
    const btn = document.createElement('button');
    btn.innerHTML = '截图';
    this.btnCont.insertAdjacentElement('beforeend', btn);
    // 创建img标签接收canvas生成的图片
    const img = document.createElement('img');
    // 添加清除画布点击事件
    btn.addEventListener('click', () => {
      console.log(this.el.toDataURL())
      img.src = this.el.toDataURL();
      img.classList.add('img-shot');
    })
    this.btnCont.insertAdjacentElement('afterend', img);
    return this;
  }
  private initCanvas(): void {
    this.canvas.fillStyle = this.bgColor; // 颜料
    this.canvas.fillRect(0, 0, this.width, this.height); // 画
    // 初始化时添加按钮容器
    this.el.insertAdjacentElement('afterend', this.btnCont);
    this.btnCont.style.cssText = "margin-top: 10px"
  }

}
const init = new BlackBloard();
init.clear().setLineColor();
init.eraser();
init.show();
