import { useDisclosure } from '@mantine/hooks'
import { Modal } from '@mantine/core'
import Eye from '../../../public/images/icons/eye.svg'

interface EyeImageViewerProps {
  imageSrc: string
}

const EyeImageViewer = ({ imageSrc }: EyeImageViewerProps) => {
  const [opened, { open, close }] = useDisclosure(false)
  return (
    <>
      <div
        className="absolute right-[8px] top-[48px] flex h-[30px] w-[30px] items-center justify-center rounded-full bg-white hover:cursor-pointer"
        onClick={open}
      >
        <img className="h-[24px] w-[24px]" src={Eye} alt="Eye Icon" />
      </div>
      <Modal opened={opened} onClose={close} title="Image Preview" centered>
        <div className="flex flex-row justify-center">
          <img src={imageSrc} alt="Preview" className="h-auto rounded-lg" />
        </div>
      </Modal>
    </>
  )
}

export default EyeImageViewer
