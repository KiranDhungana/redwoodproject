import { notifications } from '@mantine/notifications'

interface TosterProps {
  message?: string
  title?: string
}

const Toster: React.FC<TosterProps> = ({ message, title }) => {
  return notifications.show({
    position: 'top-right',
    title: `${title}`,
    message: `${message}`,
})
}

export default Toster
