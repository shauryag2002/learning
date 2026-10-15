# 🏋️ Exercise 01: Two-Input Sum Calculator (Step-by-Step Walkthrough)

Welcome to your first hands-on build! Instead of dumping finished code on you, this guide walks you through every single step—from where to click in Android Studio to create the file, to how to wire it into your app, and how to write each line of code with its required imports.

---

## 🗺️ What We Are Building & How It Works

You are going to build a **Sum Calculator screen**:
1. Two input boxes where you type numbers.
2. A **"Sum Up"** button that adds them together.
3. A **"Clear"** button that resets everything.
4. A card that pops up displaying the result (or a friendly error message if you typed letters instead of numbers).

Let's do this step by step!

---

## 📍 Phase 1: Creating the New File in Android Studio

Let's create a dedicated file for this exercise inside Android Studio.

### Step 1: Locate the Project Tree
1. Look at the left sidebar of Android Studio. If you don't see your folders, press `Alt + 1` (Windows/Linux) or `Cmd + 1` (Mac) to open the **Project Tool Window**.
2. Make sure the dropdown at the very top of that sidebar says **Android** (or **Project**).
3. Expand the folders down to your package:
   ```text
   app
    └── java (or kotlin+java)
         └── me.shauryag2002.learning
   ```

### Step 2: Create an `exercises` Package (Good Organization!)
1. **Right-click** on the `me.shauryag2002.learning` folder.
2. Select **New** ➔ **Package**.
3. In the popup, type:
   ```text
   exercises
   ```
   and press `Enter`.
   *(You now have a clean folder: `me.shauryag2002.learning.exercises`)*

### Step 3: Create the Kotlin File
1. **Right-click** on your new `exercises` folder.
2. Select **New** ➔ **Kotlin Class/File**.
3. Type:
   ```text
   SumExercise
   ```
4. Choose **File** from the dropdown list and press `Enter`.

🎉 Android Studio will open a brand new file with just one line at the top:
```kotlin
package me.shauryag2002.learning.exercises
```

---

## 🔌 Phase 2: How to Connect This Screen to Your App (`MainActivity.kt`)

Before writing all the UI code, let's understand **how any new screen connects to the app entry point**.

Open [`MainActivity.kt`](file:///home/shaurya/Desktop/learning/android/app/src/main/java/me/shauryag2002/learning/MainActivity.kt). Look inside `onCreate`:

```kotlin
setContent {
    LearningTheme {
        Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
            Greeting(
                name = "Android",
                modifier = Modifier.padding(innerPadding)
            )
        }
    }
}
```

Notice `Greeting(...)`? That is the composable currently being displayed on your phone screen when the app boots up.

To show your new exercise instead:
1. At the top of `MainActivity.kt`, you will import your new screen:
   ```kotlin
   import me.shauryag2002.learning.exercises.SumExerciseScreen
   ```
2. Inside `Scaffold`, you replace `Greeting(...)` with:
   ```kotlin
   SumExerciseScreen(modifier = Modifier.padding(innerPadding))
   ```

*(Keep this in mind! Once we write `SumExerciseScreen` in Phase 3, this is how you plug it in!)*

---

## 🛠️ Phase 3: Writing the Exercise Step-by-Step

Switch back to your new file: `SumExercise.kt`.

### Step 1: The Composable Shell & Preview
Every UI component in Compose is a function annotated with `@Composable`.

Add this empty skeleton to your file:

```kotlin
package me.shauryag2002.learning.exercises

import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import me.shauryag2002.learning.ui.theme.LearningTheme

@Composable
fun SumExerciseScreen(modifier: Modifier = Modifier) {
    // We will build our UI here!
}

@Preview(showBackground = true, showSystemUi = true)
@Composable
fun SumExerciseScreenPreview() {
    LearningTheme {
        SumExerciseScreen()
    }
}
```

> 💡 **Why add `@Preview` now?**
> In the top-right corner of the editor, click **Split**. As you add code to `SumExerciseScreen`, Android Studio will update the preview pane live!

---

### Step 2: Defining the State Variables
In Jetpack Compose, the screen automatically updates whenever a **State** variable changes.

A regular variable like `var firstInput = ""` does **not** work in Compose because every time the screen redraws, the function re-runs and resets it back to `""`!

To remember values across redraws, we use `remember { mutableStateOf("") }`.

Add these 4 state variables inside `SumExerciseScreen`:

```kotlin
@Composable
fun SumExerciseScreen(modifier: Modifier = Modifier) {
    // 1. STATE VARIABLES
    var firstInput by remember { mutableStateOf("") }
    var secondInput by remember { mutableStateOf("") }
    var resultText by remember { mutableStateOf("") }
    var isError by remember { mutableStateOf(false) }

    // UI will go below
}
```

#### ⚠️ Did Android Studio show red squiggly lines under `by`?
This is the #1 most common issue for beginners! The `by` keyword in Kotlin requires two special delegate imports.
Add these imports at the top of your file:
```kotlin
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
```
*(Tip: In Android Studio, you can place your cursor on `by` and press `Alt + Enter` / `Option + Enter` to auto-import them).*

---

### Step 3: Adding the Main `Column` Container
We want our items stacked vertically in the center of the screen.

Add a `Column` below the state variables:

```kotlin
@Composable
fun SumExerciseScreen(modifier: Modifier = Modifier) {
    var firstInput by remember { mutableStateOf("") }
    var secondInput by remember { mutableStateOf("") }
    var resultText by remember { mutableStateOf("") }
    var isError by remember { mutableStateOf(false) }

    Column(
        modifier = modifier
            .fillMaxSize()
            .padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        // Child elements will be added here
    }
}
```

**New Imports needed:**
```kotlin
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.ui.Alignment
import androidx.compose.ui.unit.dp
```

---

### Step 4: Adding Title and Subtitle
Inside the `Column { ... }`, add headline text to welcome the user:

```kotlin
        // Title
        Text(
            text = "Sum Calculator",
            style = MaterialTheme.typography.headlineMedium,
            fontWeight = FontWeight.Bold,
            color = MaterialTheme.colorScheme.primary
        )

        // Subtitle
        Text(
            text = "Enter two numbers below and calculate their sum",
            style = MaterialTheme.typography.bodyMedium,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
            textAlign = TextAlign.Center,
            modifier = Modifier.padding(top = 4.dp, bottom = 24.dp)
        )
```

**New Imports needed:**
```kotlin
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
```

---

### Step 5: Adding the Two Input Fields (`OutlinedTextField`)
Now we add text boxes for the user to type their numbers. We use `KeyboardOptions` so the numeric keyboard pops up on their phone.

Add this right after the subtitle:

```kotlin
        // First Number Input
        OutlinedTextField(
            value = firstInput,
            onValueChange = { newValue ->
                firstInput = newValue
                isError = false // reset error when user types
            },
            label = { Text("First Number") },
            placeholder = { Text("e.g. 42") },
            singleLine = true,
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
            modifier = Modifier.fillMaxWidth()
        )

        Spacer(modifier = Modifier.height(16.dp))

        // Second Number Input
        OutlinedTextField(
            value = secondInput,
            onValueChange = { newValue ->
                secondInput = newValue
                isError = false
            },
            label = { Text("Second Number") },
            placeholder = { Text("e.g. 58") },
            singleLine = true,
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
            modifier = Modifier.fillMaxWidth()
        )

        Spacer(modifier = Modifier.height(24.dp))
```

**New Imports needed:**
```kotlin
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.OutlinedTextField
import androidx.compose.ui.text.input.KeyboardType
```

---

### Step 6: Adding Action Buttons in a `Row`
We need two buttons side-by-side:
1. **Sum Up:** Performs the addition.
2. **Clear:** Resets all text fields.

Add this below the inputs:

```kotlin
        // Buttons Row
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            // Calculate Button
            Button(
                onClick = {
                    val num1 = firstInput.trim().toDoubleOrNull()
                    val num2 = secondInput.trim().toDoubleOrNull()

                    if (num1 != null && num2 != null) {
                        val sum = num1 + num2
                        // If whole number (e.g. 10.0), show 10 instead of 10.0
                        resultText = if (sum % 1.0 == 0.0) {
                            sum.toLong().toString()
                        } else {
                            sum.toString()
                        }
                        isError = false
                    } else {
                        resultText = "Please enter valid numbers in both fields"
                        isError = true
                    }
                },
                modifier = Modifier.weight(1f)
            ) {
                Text("Sum Up")
            }

            // Clear Button
            OutlinedButton(
                onClick = {
                    firstInput = ""
                    secondInput = ""
                    resultText = ""
                    isError = false
                },
                modifier = Modifier.width(100.dp)
            ) {
                Text("Clear")
            }
        }

        Spacer(modifier = Modifier.height(32.dp))
```

**New Imports needed:**
```kotlin
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.width
import androidx.compose.material3.Button
import androidx.compose.material3.OutlinedButton
```

> 🔍 **Why `.toDoubleOrNull()`?**
> If the user enters invalid characters or leaves it blank, regular `.toDouble()` throws a crash (`NumberFormatException`).
> `.toDoubleOrNull()` safely returns `null` instead of crashing!

---

### Step 7: Showing the Result Card
Finally, we want a nice card to pop up **only when there is a result to show**.

Add this at the end of the `Column`:

```kotlin
        // Result Card (Only appears when resultText is not empty)
        if (resultText.isNotEmpty()) {
            ElevatedCard(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.elevatedCardColors(
                    containerColor = if (isError) {
                        MaterialTheme.colorScheme.errorContainer
                    } else {
                        MaterialTheme.colorScheme.primaryContainer
                    }
                ),
                elevation = CardDefaults.elevatedCardElevation(defaultElevation = 6.dp)
            ) {
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(20.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text(
                        text = if (isError) "Notice" else "Calculation Result",
                        style = MaterialTheme.typography.labelLarge,
                        color = if (isError) {
                            MaterialTheme.colorScheme.onErrorContainer
                        } else {
                            MaterialTheme.colorScheme.onPrimaryContainer
                        }
                    )

                    Spacer(modifier = Modifier.height(8.dp))

                    Text(
                        text = resultText,
                        style = if (isError) {
                            MaterialTheme.typography.bodyLarge
                        } else {
                            MaterialTheme.typography.headlineLarge.copy(
                                fontWeight = FontWeight.ExtraBold,
                                fontSize = 36.sp
                            )
                        },
                        color = if (isError) {
                            MaterialTheme.colorScheme.onErrorContainer
                        } else {
                            MaterialTheme.colorScheme.onPrimaryContainer
                        },
                        textAlign = TextAlign.Center
                    )
                }
            }
        }
```

**New Imports needed:**
```kotlin
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.ElevatedCard
import androidx.compose.ui.unit.sp
```

---

## 🚀 Phase 4: Testing Your Screen in Android Studio

You have two awesome ways to run and test your screen:

### Option A: The Fast Way (Interactive Preview)
1. In `SumExercise.kt`, look at the top right of the code window and click **Split**.
2. Android Studio builds the preview.
3. Above the preview image, click the small **finger icon (Interactive Mode)**.
4. Now type numbers directly into the preview text fields and tap **Sum Up**! No emulator required!

### Option B: The Real Device / Emulator Way
1. Open [`MainActivity.kt`](file:///home/shaurya/Desktop/learning/android/app/src/main/java/me/shauryag2002/learning/MainActivity.kt).
2. At the top, add:
   ```kotlin
   import me.shauryag2002.learning.exercises.SumExerciseScreen
   ```
3. Inside `setContent { LearningTheme { Scaffold(...) { innerPadding -> ... } } }`, change:
   ```kotlin
   Greeting(
       name = "Android",
       modifier = Modifier.padding(innerPadding)
   )
   ```
   to:
   ```kotlin
   SumExerciseScreen(
       modifier = Modifier.padding(innerPadding)
   )
   ```
4. Click the **Green Play ▶** button at the top toolbar (or press `Shift + F10`).
5. Your app launches on your phone or emulator with your brand-new calculator!
