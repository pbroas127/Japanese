import { useState } from 'react'

function Toggle({ label, hint, on, onToggle }) {
  return (
    <button className="settings-row" onClick={onToggle} type="button">
      <span className="settings-row__text">
        <span className="settings-row__label">{label}</span>
        {hint && <span className="settings-row__hint">{hint}</span>}
      </span>
      <span className={`switch ${on ? 'is-on' : ''}`}>
        <span className="switch__knob" />
      </span>
    </button>
  )
}

// ──────────────────────────────────────────────────────────────────────────
//  SettingsPage — account (scaffold), audio, notifications, accessibility,
//  and danger zone. Account/cloud-save are structured but not fully built.
// ──────────────────────────────────────────────────────────────────────────
export default function SettingsPage({ game }) {
  const { settings, account } = game
  const [name, setName] = useState(account.username || '')
  const [confirmReset, setConfirmReset] = useState(false)

  return (
    <div className="page settings-page">
      <h2 className="page__title">⚙️ Settings</h2>

      <section className="settings-group">
        <h3 className="settings-group__title">Account</h3>
        {account.signedIn ? (
          <div className="settings-account">
            <p className="settings-account__hi">Signed in as <b>{account.username}</b></p>
            <button className="btn btn--ghost" onClick={game.signOut}>Log out</button>
          </div>
        ) : (
          <div className="settings-account">
            <input
              className="settings-input"
              placeholder="Pick a display name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={16}
            />
            <button className="btn btn--primary btn--sm" onClick={() => game.signIn(name.trim())}>
              Save
            </button>
          </div>
        )}
        <p className="settings-note">☁️ Login & cloud save are coming soon — progress is saved on this device for now.</p>
      </section>

      <section className="settings-group">
        <h3 className="settings-group__title">Audio</h3>
        <Toggle label="Sound effects" hint="Answer blips & taps" on={settings.sound} onToggle={() => game.updateSetting('sound', !settings.sound)} />
        <Toggle label="Music" hint="Forest ambience" on={settings.music} onToggle={() => game.updateSetting('music', !settings.music)} />
      </section>

      <section className="settings-group">
        <h3 className="settings-group__title">Notifications</h3>
        <Toggle label="Daily streak reminders" on={settings.notifications} onToggle={() => game.updateSetting('notifications', !settings.notifications)} />
      </section>

      <section className="settings-group">
        <h3 className="settings-group__title">Accessibility</h3>
        <Toggle label="Reduce motion" hint="Calmer animations" on={settings.reducedMotion} onToggle={() => game.updateSetting('reducedMotion', !settings.reducedMotion)} />
      </section>

      <section className="settings-group">
        <h3 className="settings-group__title settings-group__title--danger">Danger zone</h3>
        {!confirmReset ? (
          <button className="btn btn--danger" onClick={() => setConfirmReset(true)}>↺ Reset progress</button>
        ) : (
          <div className="settings-confirm">
            <p>Erase all progress on this device?</p>
            <div className="settings-confirm__row">
              <button className="btn btn--ghost btn--sm" onClick={() => setConfirmReset(false)}>Cancel</button>
              <button className="btn btn--danger btn--sm" onClick={() => { game.reset(); setConfirmReset(false) }}>Yes, reset</button>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
