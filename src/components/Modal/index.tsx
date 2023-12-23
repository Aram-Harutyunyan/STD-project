import { ReactNode } from 'react'

interface Props {
  isOpen: boolean
  onClose: () => void
  onSubmit: () => void
  content: ReactNode
}

const Modal: React.FC<Props> = ({ isOpen, onClose, onSubmit, content }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div
            className="modal-overlay fixed inset-0 bg-black opacity-25"
            onClick={onClose}
          ></div>
          <div className="modal z-10 bg-white w-96 p-6 rounded shadow-lg">
            <div className="modal-content flex justify-center items-center">
              {content}
            </div>
            <div className="modal-actions mt-4 flex justify-between">
              <button
                className="mr-2 px-4 py-2 bg-gray-300 rounded"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={onSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Modal
