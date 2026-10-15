package me.shauryag2002.learning.exercises

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.carousel.HorizontalUncontainedCarousel
import androidx.compose.material3.carousel.rememberCarouselState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material3.Text
import androidx.compose.material3.carousel.HorizontalMultiBrowseCarousel
import androidx.compose.material3.carousel.rememberCarouselState
import androidx.compose.ui.draw.clip
import androidx.compose.ui.unit.dp

@OptIn(ExperimentalMaterial3Api::class)
@Preview(showBackground = true, showSystemUi = true)
@Composable fun SumExerciseScreen(modifier: Modifier = Modifier) {
    var firstInput by remember { mutableStateOf("") }
    var secondInput by remember { mutableStateOf("") }
    var resultText by remember { mutableStateOf("") }
    Column(modifier= modifier
        .fillMaxSize()
        .padding(24.dp), horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.Center ) {
        Text(
            text = "Sum Calculator",
            style = MaterialTheme.typography.headlineMedium,
            fontWeight = FontWeight.Bold,
            color = MaterialTheme.colorScheme.primary
        )
        OutlinedTextField(firstInput,
            onValueChange = { newValue ->
                firstInput = newValue
            },
            label = { Text("first Number")},
            placeholder = {Text("aofijweaioj trying")},
            singleLine = true,
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
            modifier = Modifier.fillMaxWidth()
            )
        OutlinedTextField(secondInput,
            onValueChange = { newValue ->
                secondInput = newValue
            },
            label = { Text("first Number")},
            placeholder = {Text("aofijweaioj trying")},
            singleLine = true,
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
            modifier = Modifier.fillMaxWidth()
        )
        Row(Modifier.fillMaxWidth(), Arrangement.spacedBy(12.dp)) {
            Button(onClick = {
                val num1 = firstInput.trim().toDoubleOrNull()
                val num2 = secondInput.trim().toDoubleOrNull()
                if(num1 == null || num2 == null) {
                    return@Button;
                }
                resultText = (num1 +num2).toLong().toString();
            }) {
                Text("Sum Up")
            }
            OutlinedButton (
                onClick = {
                    firstInput = ""
                    secondInput = ""
                    resultText = ""
                },
                modifier = Modifier.width(100.dp)
            ) {
                Text("Clear")
            }

        }
        if (resultText.isNotEmpty()){
            Text(
                text = resultText,
                style = MaterialTheme.typography.headlineMedium,
                fontWeight = FontWeight.Bold,
                color = MaterialTheme.colorScheme.primary
            )
        }
        val items = listOf(Color.Red, Color.Green, Color.Blue, Color.Magenta, Color.Cyan)

        HorizontalMultiBrowseCarousel(
            state = rememberCarouselState { items.size },
            modifier = Modifier
                .fillMaxWidth()
                .height(200.dp),
            preferredItemWidth = 256.dp, // Ideal width for focused items
            itemSpacing = 8.dp,
            contentPadding = PaddingValues(horizontal = 16.dp)
        ) { index ->
            // As you scroll, Material 3 automatically resizes/morphs this container width
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .clip(MaterialTheme.shapes.extraLarge)
                    .background(items[index]),
                contentAlignment = Alignment.Center
            ) {
                Text(text = "Item ${index + 1}", color = Color.White)
            }
        }
    }
}