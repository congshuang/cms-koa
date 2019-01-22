import types from "../store/mutation-types";

let myVar = {};
export default function () {
  return {
    data() {
      return {
        dragState: {
          start: -9, // 起始元素的 index
          end: -9, // 移动鼠标时所覆盖的元素 index
          dragging: false, // 是否正在拖动
          direction: undefined // 拖动方向
        },
      }
    },
    created() {

    },
    watch: {},
    computed: {},
    methods: {
      renderHeader(createElement, {column}) {
        return createElement(
          'div', {
            'class': ['thead-cell'],
            on: {
              mousedown: ($event) => {
                this.handleMouseDown($event, column)
              },
              mousemove: ($event) => {
                this.handleMouseMove($event, column)
              }
            }
          }, [
            // 添加 <a> 用于显示表头 label
            createElement('a', column.label),
            // 添加一个空标签用于显示拖动动画
          ])
      },
// 按下鼠标开始拖动
      handleMouseDown(e, column) {
        let index = parseInt(column.columnKey);
        myVar = setTimeout(() =>{
          console.log(this.tableHeader)
          this.tableHeader.splice(index,1);
        },1000);
        this.dragState.dragging = true
        this.dragState.start = index
        // 给拖动时的虚拟容器添加宽高
        document.addEventListener('mouseup', this.handleMouseUp);
      },

// 鼠标放开结束拖动
      handleMouseUp() {
        clearTimeout(myVar);
        this.dragColumn(this.dragState)
        // 初始化拖动状态
        this.dragState = {
          start: -9,
          end: -9,
          dragging: false,
          direction: undefined
        };
        let arr = Object.assign([], this.tableData.rows);
        this.tableData.rows = [];
        this.tableData.rows = arr;
        document.removeEventListener('mouseup', this.handleMouseUp);
      },

// 拖动中
      handleMouseMove(e, column) {
        clearTimeout(myVar);
        if (this.dragState.dragging) {
          let index = parseInt(column.columnKey) // 记录起始列
          if (index - this.dragState.start !== 0) {
            this.dragState.direction = index - this.dragState.start < 0 ? 'left' : 'right' // 判断拖动方向
            this.dragState.end = parseInt(column.columnKey)
          } else {
            this.dragState.direction = undefined
          }
        } else {
          return false
        }
      },
// 拖动易位
      dragColumn({start, end, direction}) {
        let tempData = []
        let left = direction === 'left';
        let min = left ? end : start - 1;
        let max = left ? start + 1 : end;
        for (let i = 0; i < this.tableHeader.length; i++) {
          if (i === end) {
            tempData.push(this.tableHeader[start])
          } else if (i > min && i < max) {
            tempData.push(this.tableHeader[left ? i - 1 : i + 1])
          } else {
            tempData.push(this.tableHeader[i])
          }
        }
        this.tableHeader = tempData
      },
    }
  }
}
