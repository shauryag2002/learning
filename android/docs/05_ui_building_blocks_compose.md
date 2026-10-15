# 🎨 Chapter 05: UI Building Blocks with Jetpack Compose

Welcome to Chapter 05! In [Chapter 04: Kotlin Fundamentals](file:///home/shaurya/Desktop/learning/android/docs/04_kotlin_basics_for_android.md), you mastered the language toolkit: `val`/`var`, null safety, lambdas, and data classes.

Now comes the fun part: **bringing screens to life**.

In this chapter, you will learn how **Jetpack Compose** works under the hood, how to arrange elements with `Column`, `Row`, and `Box`, how the almighty `Modifier` controls layout and design, and how to preview your components in Android Studio without waiting for an emulator to boot.

---

## 🧠 Part 1: The Mental Shift (Declarative vs. Imperative)

For over a decade, Android UI was built using **imperative XML layouts**:

```text
The Old Imperative Way (Android Views & XML):
1. Write layout in activity_main.xml with <TextView android:id="@+id/scoreText" ... />
2. In Java/Kotlin: val scoreView = findViewById<TextView>(R.id.scoreText)
3. When score changes: scoreView.text = "Score: 10"
4. If score > 100: scoreView.setTextColor(Color.GREEN)
```

### Why was this problematic?
As your app grows, keeping your UI elements in sync with your data becomes a nightmare. If you updated the data in one place but forgot to update the view, you got visual bugs, out-of-sync states, or runtime crashes.

### The Modern Declarative Way (Jetpack Compose):

In Jetpack Compose, **the UI is a mathematical function of state**:

$$\text{UI} = f(\text{State})$$

You don't manually find a view and mutate it. Instead, you describe **what the UI should look like for a given state**. When the state changes, Compose automatically re-runs the function and updates the screen.

```kotlin
// The Compose Way:
@Composable
fun ScoreCard(score: Int) {
    Text(
        text = "Score: $score",
        color = if (score > 100) Color.Green else Color.Black
    )
}
```

If `score` changes from `90` to `110`, Compose automatically redraws the text in green. No `findViewById`, no manual state-syncing bugs!

---

## 🧱 Part 2: What is a `@Composable` Function?

A Composable is just a regular Kotlin function annotated with `@Composable`.

```kotlin
@Composable
fun WelcomeBanner(name: String) {
    Text(text = "Welcome back, $name!")
}
```

### The 4 Golden Rules of Composables:
1. **Can only be called from other Composables:** You can't call `@Composable` functions from regular Kotlin functions (unless wrapped inside `setContent { ... }`).
2. **They produce UI, they don't return values:** Notice the function returns `Unit` (nothing). Its job is to emit UI nodes into the Compose tree.
3. **They can execute in any order:** Compose has an intelligent compiler. Never rely on the execution order of sibling composables.
4. **They can re-execute frequently (Recomposition):** When input state changes, Compose re-executes the function. Never put heavy, blocking operations (like reading a large file or network calls) directly in the body of a composable!

---

## 📐 Part 3: The Big Three Layouts (`Column`, `Row`, `Box`)

Every complex Android screen is built using combinations of three fundamental containers:

```text
     Column                   Row                     Box
┌──────────────┐      ┌─────────────────┐      ┌──────────────┐
│   Item 1     │      │ Item 1 │ Item 2 │      │ ┌──────────┐ │
├──────────────┤      └─────────────────┘      │ │  Item 2  │ │
│   Item 2     │                               │ │ ┌──────┐ │ │
├──────────────┤                               │ │ │Item 1│ │ │
│   Item 3     │                               │ └─┴──────┴─┘ │
└──────────────┘                               └──────────────┘
(Vertical Stack)      (Horizontal Flow)         (Z-Index Layers)
```

### 1. `Column` (Vertical Stacking)
Positions children vertically from top to bottom.

```kotlin
Column(
    modifier = Modifier.fillMaxSize().padding(16.dp),
    verticalArrangement = Arrangement.spacedBy(8.dp), // gap between items
    horizontalAlignment = Alignment.CenterHorizontally // align children horizontally
) {
    Text("Header")
    Text("Subtitle")
    Button(onClick = { }) { Text("Click Me") }
}
```

### 2. `Row` (Horizontal Arrangement)
Positions children horizontally from left to right.

```kotlin
Row(
    modifier = Modifier.fillMaxWidth().padding(16.dp),
    horizontalArrangement = Arrangement.SpaceBetween, // spread items apart
    verticalAlignment = Alignment.CenterVertically    // align items vertically
) {
    Text("Dark Mode")
    Switch(checked = true, onCheckedChange = { })
}
```

### 3. `Box` (Z-Index Layering & Stacking)
Places elements on top of each other. Great for badges, image overlays, and centered floating items.

```kotlin
Box(
    modifier = Modifier.size(100.dp),
    contentAlignment = Alignment.Center
) {
    // Layer 1: Background Circle
    Surface(
        modifier = Modifier.fillMaxSize(),
        shape = CircleShape,
        color = MaterialTheme.colorScheme.primaryContainer
    ) {}

    // Layer 2: Icon on top of the circle
    Icon(
        imageVector = Icons.Default.Favorite,
        contentDescription = "Favorite",
        tint = MaterialTheme.colorScheme.primary
    )
}
```

---

## 🎨 Part 4: The Almighty `Modifier`

If Composables are the bricks, `Modifier` is the mortar, paint, and behavior. Modifiers tell a composable how to display, size, decorate, or respond to user interactions.

```kotlin
Text(
    text = "Hello Android!",
    modifier = Modifier
        .fillMaxWidth()
        .background(Color.Yellow)
        .padding(16.dp)
)
```

### 🚨 Critical Senior Lesson: ORDER OF MODIFIERS MATTERS!

In CSS, `padding` and `margin` are separate properties. In Jetpack Compose, there is **no margin**—everything is `padding`, and the order determines whether it behaves like margin or padding!

Look at these two examples:

#### Example A: Padding first, then Background
```kotlin
Box(
    modifier = Modifier
        .padding(16.dp)            // 1. Insets space from parent (acts like MARGIN)
        .background(Color.Cyan)    // 2. Fills color INSIDE the inset area
        .size(100.dp)
)
```

#### Example B: Background first, then Padding
```kotlin
Box(
    modifier = Modifier
        .background(Color.Cyan)    // 1. Fills background to outer edge
        .padding(16.dp)            // 2. Insets the INNER content (acts like PADDING)
        .size(100.dp)
)
```

> 💡 **Golden Rule:** Modifiers are applied sequentially from top to bottom. If you want a background with an outer margin: write `.padding(...)` first, then `.background(...)`!

### Common Modifiers Cheat Sheet:

| Modifier | What it Does |
|---|---|
| `.fillMaxSize()` | Expands to fill all available width & height (like `match_parent`). |
| `.fillMaxWidth()` | Expands to fill available width. |
| `.size(width, height)` | Gives fixed dimensions (e.g. `.size(48.dp)`). |
| `.padding(16.dp)` | Adds spacing around or inside the element. |
| `.background(Color)` | Paints a background color. |
| `.clip(RoundedCornerShape(12.dp))` | Clips element to rounded corners or a shape. |
| `.clickable { ... }` | Makes any element respond to taps with touch ripple! |
| `.weight(1f)` | (Inside `Row`/`Column`) Distributes proportional remaining space. |

---

## 🧰 Part 5: Core Material Design 3 Components

Material Design 3 (M3) is Google's design system built right into Compose. Here are the core controls you'll use constantly:

### 1. `Text`
```kotlin
Text(
    text = "Important Alert",
    style = MaterialTheme.typography.titleLarge,
    fontWeight = FontWeight.Bold,
    color = MaterialTheme.colorScheme.error
)
```

### 2. `Button` & `OutlinedButton`
```kotlin
// Filled primary button
Button(onClick = { println("Saved!") }) {
    Text("Save Changes")
}

// Subtle outlined button for secondary actions
OutlinedButton(onClick = { println("Cancelled") }) {
    Text("Cancel")
}
```

### 3. `OutlinedTextField` (Text Input)
```kotlin
var textState by remember { mutableStateOf("") }

OutlinedTextField(
    value = textState,
    onValueChange = { newText -> textState = newText },
    label = { Text("Email Address") },
    singleLine = true,
    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Email)
)
```

### 4. `ElevatedCard` (Containers with Elevation & Shadow)
```kotlin
ElevatedCard(
    modifier = Modifier.fillMaxWidth(),
    elevation = CardDefaults.elevatedCardElevation(defaultElevation = 4.dp)
) {
    Column(modifier = Modifier.padding(16.dp)) {
        Text("Card Title", style = MaterialTheme.typography.titleMedium)
        Text("Supporting descriptive text goes here.", style = MaterialTheme.typography.bodySmall)
    }
}
```

---

## ⚡ Part 6: Android Studio's Superpower: `@Preview`

You don't need to boot an emulator every time you change a font size or move a button. Compose provides instant previewing in Android Studio!

```kotlin
@Preview(showBackground = true, showSystemUi = true)
@Composable
fun MyScreenPreview() {
    LearningTheme {
        WelcomeBanner(name = "Shaurya")
    }
}
```

### Preview Options:
- `showBackground = true`: Adds a white/dark background behind your composable.
- `showSystemUi = true`: Wraps the composable inside a simulated phone frame with the status bar and navigation bar.
- **Interactive Mode:** Click the small **finger icon** (Interactive Mode) at the top of the Preview panel in Android Studio. You can now click buttons, type in text fields, and interact with your UI in real time right inside the editor!

---

## 🚀 Practical Application: Two-Input Sum Exercise

We put all these building blocks together in your first exercise:
👉 Check out [`exercises/01_two_input_sum.md`](file:///home/shaurya/Desktop/learning/android/exercises/01_two_input_sum.md)

It combines:
- `Column` for screen structure
- Two `OutlinedTextField` inputs with numeric keyboards
- `Row` with `Button` and `OutlinedButton`
- `ElevatedCard` for the result
- `remember { mutableStateOf(...) }` to reactively trigger UI updates.

---

## 🎯 Chapter 05 Knowledge Check

1. **Why does Compose not use `findViewById`?**
2. **In a `Row`, what does `Modifier.weight(1f)` do?**
3. **If you write `.padding(16.dp).background(Color.Blue)`, is the padding inside or outside the blue box?**

*(Answers: 1. Compose is declarative—UI is driven by state, not by mutating existing view objects. 2. It claims available proportional space along the horizontal axis. 3. The padding is outside—the blue background only fills the inner remaining space!)*

---

## 🏁 Key Takeaways

1. **`UI = f(State)`**: You don't mutate views; you describe what the UI looks like for the current state.
2. **Layout Triad**: Master `Column` (vertical), `Row` (horizontal), and `Box` (layered).
3. **Modifier Order Matters**: Every modifier transforms the component sequentially.
4. **Instant Feedback**: Use `@Preview` and Interactive Mode in Android Studio to iterate fast without running an emulator every 30 seconds.

👉 Ready for more? Next up: [Chapter 06: State & Recomposition](file:///home/shaurya/Desktop/learning/android/docs/06_state_and_recomposition.md) (Deep dive into unidirectional data flow and hoisting state!).
