@objc(RnImageFilterConvert)
class RnImageFilterConvert: NSObject {
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false
  }

  @objc
  func FilterSimple(_ filterProps: NSDictionary, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    guard var base64 = filterProps["data"] as? String, let filter = filterProps["filter"] as? String else {
      reject("ERROR", "Invalid parameters", nil)
      return
    }

    base64 = formatBase64String(base64)

    guard let image = decodeBase64ToImage(base64) else {
      reject("ERROR", "Invalid base64 string", nil)
      return
    }

    var filteredImage: UIImage

    switch filter {
      case "default":
        filteredImage = applyDefaultFilter(image: image)
      case "blackAndWhite":
        filteredImage = applyBlackAndWhiteFilter(image: image)
      case "shadesGray":
        filteredImage = applyGrayscaleFilter(image: image)
      default:
        reject("ERROR", "Invalid filter type", nil)
        return
    }

    let base64String = encodeImageToBase64(image: filteredImage)
    let response: [String: Any] = [
      "uri": base64String,
      "filter": filter,
      "type": "base64",
      "status": [
        "status": "success",
        "message": NSNull()
      ]
    ]
    resolve(response)
  }

  private func formatBase64String(_ base64: String) -> String {
    let cleanBase64 = base64
      .replacingOccurrences(of: "^data:image/[^;]+;base64,", with: "", options: .regularExpression)
      .replacingOccurrences(of: "\\s", with: "", options: .regularExpression)
    return cleanBase64
  }

  private func decodeBase64ToImage(_ base64: String) -> UIImage? {
    guard let data = Data(base64Encoded: base64) else { return nil }
    return UIImage(data: data)
  }

  private func encodeImageToBase64(image: UIImage) -> String {
    guard let imageData = image.jpegData(compressionQuality: 1.0) else { return "" }
    return "data:image/jpeg;base64,\(imageData.base64EncodedString())"
  }

  private func applyDefaultFilter(image: UIImage) -> UIImage {
    return image
  }

  private func applyBlackAndWhiteFilter(image: UIImage) -> UIImage {
    let context = CIContext(options: nil)
    let ciFilter = CIFilter(name: "CIPhotoEffectMono")
    let ciImage = CIImage(image: image)
    ciFilter?.setValue(ciImage, forKey: kCIInputImageKey)
    guard let outputImage = ciFilter?.outputImage else { return image }
    guard let cgImage = context.createCGImage(outputImage, from: outputImage.extent) else { return image }
      return UIImage(cgImage: cgImage)
  }

  private func applyGrayscaleFilter(image: UIImage) -> UIImage {
    let context = CIContext(options: nil)
    let ciFilter = CIFilter(name: "CIPhotoEffectTonal")
    let ciImage = CIImage(image: image)
    ciFilter?.setValue(ciImage, forKey: kCIInputImageKey)
    guard let outputImage = ciFilter?.outputImage else { return image }
    guard let cgImage = context.createCGImage(outputImage, from: outputImage.extent) else { return image }
    return UIImage(cgImage: cgImage)
  }
}
