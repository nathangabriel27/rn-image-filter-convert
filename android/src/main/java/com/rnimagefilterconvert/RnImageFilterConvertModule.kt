package com.rnimagefilterconvert

import com.facebook.react.bridge.*
import android.util.Base64
import android.graphics.BitmapFactory
import android.graphics.Bitmap
import android.graphics.Color
import java.io.ByteArrayOutputStream
import java.lang.Exception

class RnImageFilterConvertModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return NAME
  }

    @ReactMethod
    fun FilterSimple(filterProps: ReadableMap, promise: Promise) {
      var base64 = filterProps.getString("data")
      val filter = filterProps.getString("filter")

      if (base64 == null || filter == null) {
          promise.reject("ERROR", "Invalid parameters")
          return
      }

      base64 = formatBase64String(base64)
      val image = decodeBase64ToBitmap(base64)

      if (image == null) {
        promise.reject("ERROR", "Invalid base64 string")
        return
      }

      val filteredImage: Bitmap = when (filter) {
        "default" -> applyDefaultFilter(image)
        "blackAndWhite" -> applyBlackAndWhiteFilter(image)
        "shadesGray" -> applyGrayscaleFilter(image)
        else -> {
          promise.reject("ERROR", "Invalid filter type")
          return
        }
      }

      val base64String = encodeBitmapToBase64(filteredImage)
      val response = Arguments.createMap().apply {
        putString("uri", base64String)
        putString("filter", filter)
        putString("type", "base64")
        val status = Arguments.createMap()
        status.putString("status", "success")
        status.putNull("message")
        putMap("status", status)
      }
      promise.resolve(response)
  }

    private fun formatBase64String(base64: String): String {
        return base64.replace("^data:image/[^;]+;base64,".toRegex(), "")
                   .replace("\\s".toRegex(), "")
    }

    private fun decodeBase64ToBitmap(base64: String): Bitmap {
        val decodedString = Base64.decode(base64, Base64.DEFAULT)
        return BitmapFactory.decodeByteArray(decodedString, 0, decodedString.size)
    }

    private fun encodeBitmapToBase64(bitmap: Bitmap): String {
        val byteArrayOutputStream = ByteArrayOutputStream()
        bitmap.compress(Bitmap.CompressFormat.JPEG, 100, byteArrayOutputStream)
        val byteArray = byteArrayOutputStream.toByteArray()
        return "data:image/jpeg;base64," + Base64.encodeToString(byteArray, Base64.NO_WRAP)
    }

    private fun applyDefaultFilter(image: Bitmap): Bitmap {
      return image
    }

    private fun applyBlackAndWhiteFilter(bitmap: Bitmap): Bitmap {
      val width = bitmap.width
      val height = bitmap.height
      val blackAndWhiteBitmap = Bitmap.createBitmap(width, height, Bitmap.Config.ARGB_8888)

      for (x in 0 until width) {
          for (y in 0 until height) {
              val pixel = bitmap.getPixel(x, y)
              val red = Color.red(pixel)
              val green = Color.green(pixel)
              val blue = Color.blue(pixel)
              val gray = (red + green + blue) / 3
              val newPixel = if (gray > 128) Color.WHITE else Color.BLACK
              blackAndWhiteBitmap.setPixel(x, y, newPixel)
          }
      }
        return blackAndWhiteBitmap
    }

    private fun applyGrayscaleFilter(bitmap: Bitmap): Bitmap {
        val width = bitmap.width
        val height = bitmap.height
        val bmpGrayscale = Bitmap.createBitmap(width, height, Bitmap.Config.ARGB_8888)
        val canvas = android.graphics.Canvas(bmpGrayscale)
        val paint = android.graphics.Paint()
        val colorMatrix = android.graphics.ColorMatrix()
        colorMatrix.setSaturation(0f)
        val filter = android.graphics.ColorMatrixColorFilter(colorMatrix)
        paint.colorFilter = filter
        canvas.drawBitmap(bitmap, 0f, 0f, paint)
        return bmpGrayscale
    }

  companion object {
    const val NAME = "RnImageFilterConvert"
  }
}
