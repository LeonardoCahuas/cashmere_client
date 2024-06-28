import { PrimaryButton, YStack } from "@siva/ui";

export function HomeScreen({ pagesMode = false }: { pagesMode?: boolean }) {
  return (
    <YStack f={1} jc="center" ai="center" gap="$8" p="$4" bg="$background">
       <PrimaryButton>Siva</PrimaryButton>
    </YStack>
  )
}
