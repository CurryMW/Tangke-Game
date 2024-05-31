import './style.css'

// 创建黑板类
class BlackBloard {
  // 在constructor中使用public等直接声明类属性，而不是成为形参（不需要再去外面定义通过this去挂到类对象中）
  constructor(
    public el = document.querySelector<HTMLCanvasElement>('#canvas')!,
    public canvas = el.getContext('2d')!,
    public width = el.width,
    public height = el.height
  ) {
    // 初始化黑板
    this.initCanvas();
    // 监听写字
    this.bindEvents();
  }
  private bindEvents(): void {
    const callBack = this.drawLine.bind(this); // 使用bind会创建一个函数，必须手动调用，将函数this指向指定对象
    console.log(callBack)
    // 绑定鼠标按下事件写字
    this.el.addEventListener('mousedown', () => {
      this.canvas.beginPath(); // 按下时重新开始画
      this.canvas.strokeStyle = "#ffF"; // 线条颜料
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

  private initCanvas(): void {
    this.canvas.fillStyle = "#2c3e50"; // 颜料
    this.canvas.fillRect(0, 0, this.width, this.height); // 画
  }
}
new BlackBloard();