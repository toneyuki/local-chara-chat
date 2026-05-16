// src/renderer/src/App.tsx

function App(): React.JSX.Element {
  async function handleSave(): Promise<void> {
    console.log(window.api)
    const result = await window.api.createMessage({
      role: 'user',
      content: 'こんにちは！'
    })

    console.log(result)
  }
  return (
    <div>
      <button onClick={handleSave}>保存テスト</button>
    </div>
  )
}

export default App
