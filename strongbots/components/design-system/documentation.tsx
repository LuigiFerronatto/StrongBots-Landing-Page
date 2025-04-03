import { Section, GridLayout } from "@/components/design-system/layout"
import { Heading, Text, Display } from "@/components/design-system/typography"
import { Button } from "@/components/design-system/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/design-system/card"
import { colors } from "@/lib/design-tokens"

export default function DesignSystemDocumentation() {
  return (
    <Section padding="lg" className="design-system-docs">
      <Heading level={1} className="mb-8">
        StrongBots Design System
      </Heading>

      <Section padding="none" className="mb-16">
        <Heading level={2} className="mb-4">
          Typography
        </Heading>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-8">
              <div>
                <Text variant="overline" className="text-neutral-500 mb-4">
                  Display
                </Text>
                <div className="space-y-4">
                  <Display size="large">Display Large</Display>
                  <Display size="medium">Display Medium</Display>
                  <Display size="small">Display Small</Display>
                </div>
              </div>

              <div>
                <Text variant="overline" className="text-neutral-500 mb-4">
                  Headings
                </Text>
                <div className="space-y-4">
                  <Heading level={1}>Heading 1</Heading>
                  <Heading level={2}>Heading 2</Heading>
                  <Heading level={3}>Heading 3</Heading>
                  <Heading level={4}>Heading 4</Heading>
                  <Heading level={5}>Heading 5</Heading>
                  <Heading level={6}>Heading 6</Heading>
                </div>
              </div>

              <div>
                <Text variant="overline" className="text-neutral-500 mb-4">
                  Body Text
                </Text>
                <div className="space-y-4">
                  <Text variant="body-large">
                    Body Large - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a
                    pharetra augue.
                  </Text>
                  <Text variant="body">
                    Body - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra
                    augue.
                  </Text>
                  <Text variant="body-small">
                    Body Small - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a
                    pharetra augue.
                  </Text>
                  <Text variant="caption">Caption - Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
                  <Text variant="overline">OVERLINE TEXT</Text>
                </div>
              </div>

              <div>
                <Text variant="overline" className="text-neutral-500 mb-4">
                  Font Weights
                </Text>
                <div className="space-y-2">
                  <Text weight="regular">Regular (400)</Text>
                  <Text weight="medium">Medium (500)</Text>
                  <Text weight="semibold">Semibold (600)</Text>
                  <Text weight="bold">Bold (700)</Text>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Section>

      <Section padding="none" className="mb-16">
        <Heading level={2} className="mb-4">
          Colors
        </Heading>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-8">
              <div>
                <Text variant="overline" className="text-neutral-500 mb-4">
                  Primary
                </Text>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {Object.entries(colors.primary).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <div className="h-16 rounded-md" style={{ backgroundColor: value }}></div>
                      <Text variant="body-small" weight="medium">
                        {key}
                      </Text>
                      <Text variant="caption">{value}</Text>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Text variant="overline" className="text-neutral-500 mb-4">
                  Secondary
                </Text>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {Object.entries(colors.secondary).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <div className="h-16 rounded-md" style={{ backgroundColor: value }}></div>
                      <Text variant="body-small" weight="medium">
                        {key}
                      </Text>
                      <Text variant="caption">{value}</Text>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Text variant="overline" className="text-neutral-500 mb-4">
                  Accent
                </Text>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {Object.entries(colors.accent).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <div className="h-16 rounded-md" style={{ backgroundColor: value }}></div>
                      <Text variant="body-small" weight="medium">
                        {key}
                      </Text>
                      <Text variant="caption">{value}</Text>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Text variant="overline" className="text-neutral-500 mb-4">
                  Neutral
                </Text>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {Object.entries(colors.neutral).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <div className="h-16 rounded-md" style={{ backgroundColor: value }}></div>
                      <Text variant="body-small" weight="medium">
                        {key}
                      </Text>
                      <Text variant="caption">{value}</Text>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Text variant="overline" className="text-neutral-500 mb-4">
                  Semantic
                </Text>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <div className="h-16 rounded-md" style={{ backgroundColor: colors.success[500] }}></div>
                    <Text variant="body-small" weight="medium">
                      Success
                    </Text>
                    <Text variant="caption">{colors.success[500]}</Text>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 rounded-md" style={{ backgroundColor: colors.warning[500] }}></div>
                    <Text variant="body-small" weight="medium">
                      Warning
                    </Text>
                    <Text variant="caption">{colors.warning[500]}</Text>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 rounded-md" style={{ backgroundColor: colors.error[500] }}></div>
                    <Text variant="body-small" weight="medium">
                      Error
                    </Text>
                    <Text variant="caption">{colors.error[500]}</Text>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 rounded-md" style={{ backgroundColor: colors.info[500] }}></div>
                    <Text variant="body-small" weight="medium">
                      Info
                    </Text>
                    <Text variant="caption">{colors.info[500]}</Text>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Section>

      <Section padding="none" className="mb-16">
        <Heading level={2} className="mb-4">
          Buttons
        </Heading>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-8">
              <div>
                <Text variant="overline" className="text-neutral-500 mb-4">
                  Variants
                </Text>
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                  <Button variant="accent">Accent</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="success">Success</Button>
                </div>
              </div>

              <div>
                <Text variant="overline" className="text-neutral-500 mb-4">
                  Sizes
                </Text>
                <div className="flex flex-wrap items-center gap-4">
                  <Button variant="primary" size="xs">
                    Extra Small
                  </Button>
                  <Button variant="primary" size="sm">
                    Small
                  </Button>
                  <Button variant="primary" size="md">
                    Medium
                  </Button>
                  <Button variant="primary" size="lg">
                    Large
                  </Button>
                  <Button variant="primary" size="xl">
                    Extra Large
                  </Button>
                </div>
              </div>

              <div>
                <Text variant="overline" className="text-neutral-500 mb-4">
                  States
                </Text>
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary">Default</Button>
                  <Button variant="primary" disabled>
                    Disabled
                  </Button>
                  <Button variant="primary" isLoading>
                    Loading
                  </Button>
                  <Button variant="primary" isLoading loadingText="Loading...">
                    With Text
                  </Button>
                </div>
              </div>

              <div>
                <Text variant="overline" className="text-neutral-500 mb-4">
                  With Icons
                </Text>
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary" leftIcon={<span>👈</span>}>
                    Left Icon
                  </Button>
                  <Button variant="primary" rightIcon={<span>👉</span>}>
                    Right Icon
                  </Button>
                  <Button variant="primary" size="icon">
                    🔍
                  </Button>
                </div>
              </div>

              <div>
                <Text variant="overline" className="text-neutral-500 mb-4">
                  Rounded
                </Text>
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary" rounded="default">
                    Default
                  </Button>
                  <Button variant="primary" rounded="full">
                    Full
                  </Button>
                  <Button variant="primary" rounded="none">
                    None
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Section>

      <Section padding="none" className="mb-16">
        <Heading level={2} className="mb-4">
          Cards
        </Heading>
        <GridLayout columns={{ sm: 1, md: 2, lg: 4 }} gap="md">
          <Card variant="default" padding="md">
            <CardHeader>
              <CardTitle>Default Card</CardTitle>
            </CardHeader>
            <CardContent>
              <Text>This is a default card with medium padding.</Text>
            </CardContent>
          </Card>

          <Card variant="elevated" padding="md">
            <CardHeader>
              <CardTitle>Elevated Card</CardTitle>
            </CardHeader>
            <CardContent>
              <Text>This card has a shadow elevation.</Text>
            </CardContent>
          </Card>

          <Card variant="outlined" padding="md">
            <CardHeader>
              <CardTitle>Outlined Card</CardTitle>
            </CardHeader>
            <CardContent>
              <Text>This card has an outline border.</Text>
            </CardContent>
          </Card>

          <Card variant="filled" padding="md">
            <CardHeader>
              <CardTitle>Filled Card</CardTitle>
            </CardHeader>
            <CardContent>
              <Text>This card has a background fill.</Text>
            </CardContent>
          </Card>

          <Card variant="default" padding="md" hover="lift">
            <CardHeader>
              <CardTitle>Hover: Lift</CardTitle>
            </CardHeader>
            <CardContent>
              <Text>This card lifts on hover.</Text>
            </CardContent>
          </Card>

          <Card variant="default" padding="md" hover="highlight">
            <CardHeader>
              <CardTitle>Hover: Highlight</CardTitle>
            </CardHeader>
            <CardContent>
              <Text>This card highlights on hover.</Text>
            </CardContent>
          </Card>

          <Card variant="default" padding="md" hover="scale">
            <CardHeader>
              <CardTitle>Hover: Scale</CardTitle>
            </CardHeader>
            <CardContent>
              <Text>This card scales on hover.</Text>
            </CardContent>
          </Card>

          <Card variant="default" padding="none">
            <div className="h-32 bg-primary-100 flex items-center justify-center">
              <Text>Image Area</Text>
            </div>
            <CardContent className="p-4">
              <Text>Card with image area.</Text>
            </CardContent>
          </Card>
        </GridLayout>
      </Section>
    </Section>
  )
}

