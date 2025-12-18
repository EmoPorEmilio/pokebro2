import { createFileRoute } from '@tanstack/solid-router'
import { createSignal } from 'solid-js'
import {
  Header,
  Content,
  BottomNav,
  Button,
  Alert,
  Avatar,
  AvatarGroup,
  ProfileCard,
  EventCard,
  EventListItem,
  Badge,
  Chip,
  CalendarCard,
  Dialog,
  NavHeader,
  TabSwitch,
  ToggleSwitch,
  TimelineItem,
  ConversationPreview,
  ConversationBubble,
} from '@/components'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const [showAlert, setShowAlert] = createSignal(true)
  const [activeTab, setActiveTab] = createSignal('trending')
  const [toggleOn, setToggleOn] = createSignal(false)

  return (
    <div class="flex flex-col h-dvh w-dvw bg-bg-400 antialiased">
      <Header inGame={false} />
      <Content>
        <div class="flex flex-col w-full max-w-lg p-4 gap-6 overflow-y-auto">
          <h1 class="text-2xl font-bold text-accent">Component Examples</h1>

          {/* Buttons Section */}
          <section class="space-y-3">
            <h2 class="text-lg font-semibold text-primary-100">Buttons</h2>
            <div class="flex flex-wrap gap-2">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
            <div class="flex flex-wrap gap-2">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
            <div class="flex gap-2">
              <Button variant="link" href="/games">
                Link Button
              </Button>
              <Button disabled>Disabled</Button>
            </div>
          </section>

          {/* Alerts Section */}
          <section class="space-y-3">
            <h2 class="text-lg font-semibold text-primary-100">Alerts</h2>
            {showAlert() && (
              <Alert
                variant="info"
                title="Information"
                dismissible
                onDismiss={() => setShowAlert(false)}
              >
                This is an informational alert you can dismiss.
              </Alert>
            )}
            <Alert variant="success" title="Success">
              Operation completed successfully!
            </Alert>
            <Alert variant="warning">Watch out for this warning.</Alert>
            <Alert variant="error" title="Error">
              Something went wrong.
            </Alert>
          </section>

          {/* Avatars Section */}
          <section class="space-y-3">
            <h2 class="text-lg font-semibold text-primary-100">Avatars</h2>
            <div class="flex items-center gap-3">
              <Avatar size="xs" fallback="XS" />
              <Avatar size="sm" fallback="SM" />
              <Avatar size="md" fallback="MD" online />
              <Avatar size="lg" fallback="LG" online={false} />
              <Avatar size="xl" fallback="XL" />
            </div>
            <div class="flex items-center gap-2">
              <span class="text-primary-300 text-sm">Avatar Group:</span>
              <AvatarGroup>
                <Avatar size="sm" fallback="A" />
                <Avatar size="sm" fallback="B" />
                <Avatar size="sm" fallback="C" />
                <Avatar size="sm" fallback="+3" />
              </AvatarGroup>
            </div>
          </section>

          {/* Profile Card Section */}
          <section class="space-y-3">
            <h2 class="text-lg font-semibold text-primary-100">Profile Card</h2>
            <ProfileCard
              username="PokéMaster"
              bio="Gotta catch 'em all! Training Pokémon since Gen 1."
              followers={1250}
              following={89}
              actions={
                <div class="flex gap-2 w-full">
                  <Button variant="primary" size="sm" fullWidth>
                    Follow
                  </Button>
                  <Button variant="ghost" size="sm">
                    Message
                  </Button>
                </div>
              }
            />
          </section>

          {/* Event Cards Section */}
          <section class="space-y-3">
            <h2 class="text-lg font-semibold text-primary-100">Event Cards</h2>
            <EventCard
              title="Pokémon Tournament 2024"
              image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
              duration="2 days"
              author="Ash Ketchum"
              date="Dec 25"
              attendees={[
                { name: 'Misty' },
                { name: 'Brock' },
                { name: 'Gary' },
              ]}
              attendeeCount={42}
              actions={
                <div class="flex gap-2">
                  <Button variant="primary" size="sm">
                    Join Event
                  </Button>
                  <Button variant="ghost" size="sm">
                    Share
                  </Button>
                </div>
              }
            />
            <div class="bg-bg-200 rounded-xl p-2 space-y-1">
              <EventListItem
                title="Weekly Battle League"
                subtitle="Every Saturday at 3PM"
              />
              <EventListItem
                title="Shiny Hunting Marathon"
                subtitle="All day Sunday"
              />
              <EventListItem
                title="Trade Fair"
                subtitle="Coming next month"
              />
            </div>
          </section>

          {/* === VIVIANA UI COMPONENTS === */}
          <div class="border-t border-primary-600 pt-6">
            <h1 class="text-2xl font-bold text-accent mb-6">Viviana UI Components</h1>
          </div>

          {/* Badges Section */}
          <section class="space-y-3">
            <h2 class="text-lg font-semibold text-primary-100">Badges</h2>
            <div class="flex items-center gap-3">
              <Badge count={5} />
              <Badge count={20} variant="primary" />
              <Badge count={99} variant="danger" />
              <Badge variant="success" size="lg" count={42} />
            </div>
            <div class="flex items-center gap-3">
              <Badge size="sm" variant="accent" count={1} />
              <Badge size="md" variant="warning" count={7} />
              <Badge size="lg" variant="secondary" count={15} />
            </div>
          </section>

          {/* Chips Section */}
          <section class="space-y-3">
            <h2 class="text-lg font-semibold text-primary-100">Chips</h2>
            <div class="flex flex-wrap gap-2">
              <Chip text="Fiesta" variant="primary" />
              <Chip text="Evento" variant="secondary" />
              <Chip text="Destacado" variant="accent" />
              <Chip text="Tag" variant="outline" />
            </div>
          </section>

          {/* Switches Section */}
          <section class="space-y-3">
            <h2 class="text-lg font-semibold text-primary-100">Switches</h2>
            <div class="space-y-4">
              <div>
                <span class="text-sm text-primary-300 mb-2 block">Tab Switch:</span>
                <TabSwitch
                  options={[
                    { label: 'TENDENCIAS', value: 'trending', width: '142px' },
                    { label: 'ULTIMOS', value: 'latest', width: '108px' },
                  ]}
                  value={activeTab()}
                  onChange={setActiveTab}
                  class="w-[250px]"
                />
                <span class="text-xs text-primary-500 mt-1 block">Selected: {activeTab()}</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-sm text-primary-300">Toggle Switch:</span>
                <ToggleSwitch checked={toggleOn()} onChange={setToggleOn} />
                <span class="text-xs text-primary-500">{toggleOn() ? 'ON' : 'OFF'}</span>
              </div>
            </div>
          </section>

          {/* Calendar Card Section */}
          <section class="space-y-3">
            <h2 class="text-lg font-semibold text-primary-100">Calendar Card</h2>
            <CalendarCard
              title="Eventos de Taylor 2024"
              image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png"
              tags={['Fiesta', 'VIP']}
              followers={[{ name: 'taylorswift' }, { name: 'emoporemilio' }]}
              followerCount={5}
            />
          </section>

          {/* Dialog Section */}
          <section class="space-y-3">
            <h2 class="text-lg font-semibold text-primary-100">Dialog</h2>
            <Dialog
              title="main.rs"
              subtitle="Emo - 16/4/22"
              tags={['Fiesta']}
              primaryAction={{ label: 'ME INTERESA', onClick: () => console.log('primary') }}
              secondaryAction={{ label: 'SALI DE ACA', onClick: () => console.log('secondary') }}
            >
              <span>Esto es un test de texto! Esto es un test de texto!</span>
            </Dialog>
          </section>

          {/* Timeline Item Section */}
          <section class="space-y-3">
            <h2 class="text-lg font-semibold text-primary-100">Timeline Items</h2>
            <div class="space-y-3">
              <TimelineItem type="follow" leftUser={{ name: 'emoporemilio' }} rightUser={{ name: 'taylorswift' }} />
              <TimelineItem type="like" leftUser={{ name: 'ash' }} rightUser={{ name: 'pikachu_fan' }} />
              <TimelineItem type="event" leftUser={{ name: 'misty' }} rightUser={{ name: 'brock' }} />
            </div>
          </section>

          {/* Conversation Section */}
          <section class="space-y-3">
            <h2 class="text-lg font-semibold text-primary-100">Conversation</h2>
            <div class="bg-bg-200 rounded-xl p-2 space-y-1">
              <ConversationPreview user={{ name: 'Ash Ketchum', online: true }} lastMessage="Hey, wanna battle?" timestamp="2m" unreadCount={3} />
              <ConversationPreview user={{ name: 'Misty', online: false }} lastMessage="Sure, let me grab my Pokemon" timestamp="1h" />
            </div>
            <div class="bg-bg-300 rounded-xl">
              <div class="flex flex-col gap-2 p-4">
                <ConversationBubble content="Hey! Are you ready?" sender="other" timestamp="2:30 PM" />
                <ConversationBubble content="Yeah, lets do this!" sender="user" timestamp="2:31 PM" />
                <ConversationBubble content="I choose Pikachu!" sender="other" timestamp="2:32 PM" />
              </div>
            </div>
          </section>

          {/* NavHeader Section */}
          <section class="space-y-3">
            <h2 class="text-lg font-semibold text-primary-100">Nav Header</h2>
            <NavHeader logoText="POKEFOROS" class="rounded-xl overflow-hidden" />
          </section>
        </div>
      </Content>
      <BottomNav activeTab="home" />
    </div>
  )
}
