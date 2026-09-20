import {useDraggable} from '@dnd-kit/react';

const Draggable = () => {
  const {ref} = useDraggable({
    id: 'draggable',
  });

  return (
    <button ref={ref}>
      Draggable
    </button>
  );
}
export default Draggable;