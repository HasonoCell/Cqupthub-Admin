export function useDraggableItem(listRef) {
  let currentNode = null;

  /**
   * 处理拖拽开始的事件
   * @param {DragEvent} e 拖拽事件对象
   */
  const handleDragStart = (e) => {
    // 查找最近的 .list-item 父元素
    let target = e.target;
    while (target && !target.classList.contains("list-item")) {
      target = target.parentElement;
    }
    if (!target) return;

    // 保存当前拖拽的节点
    currentNode = target;
    // 在拖拽开始后添加 .moving 类，用于样式变化
    setTimeout(() => target.classList.add("moving"));

    // 设置拖拽图像为整个 item，true 表示深拷贝
    const dragImage = target.cloneNode(true);
    // 不让其在页面上显示出来
    dragImage.style.position = "absolute";
    dragImage.style.top = "-9999px";
    // 为了让浏览器能够识别这个元素并用于拖拽图像
    document.body.appendChild(dragImage);

    // 清除拖拽数据，防止默认行为
    e.dataTransfer.setData("text/plain", "");
    // 设置自定义拖拽图像
    e.dataTransfer.setDragImage(dragImage, 0, 0);
  };

  const handleDragEnter = (e) => {
    // 查找 .list-item
    let target = e.target;
    while (target && !target.classList.contains("list-item")) {
      target = target.parentElement;
    }

    // 确保目标节点是列表项且不是当前拖拽的节点或其子节点
    if (target === listRef.value || target === currentNode || !listRef.value)
      return;
    // 获取列表的所有子节点
    const children = Array.from(listRef.value.children);
    // 获取当前拖拽节点和目标节点的索引
    const currentIndex = children.indexOf(currentNode);
    const targetIndex = children.indexOf(target);

    // 根据当前节点和目标节点的索引调整节点位置
    if (currentIndex < targetIndex) {
      listRef.value.insertBefore(currentNode, target.nextElementSibling);
    } else {
      listRef.value.insertBefore(currentNode, target);
    }
  };

  const handleDragEnd = (e) => {
    let target = e.target;
    while (target && !target.classList.contains("list-item")) {
      target = target.parentElement;
    }
    if (target) {
      target.classList.remove("moving");
    }
    currentNode = null;
  };

  return {
    handleDragStart,
    handleDragEnter,
    handleDragEnd,
  };
}
