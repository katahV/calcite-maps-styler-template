﻿define(
	 ({
		commonCore: {
			common: {
				add: "Thêm",
				edit: "Chỉnh sửa",
				save: "Lưu",
				next: "Tiếp",
				cancel: "Hủy",
				back: "Quay lại",
				apply: "Áp dụng",
				close: "Đóng",
				open: "Mở",
				start: "Bắt đầu",
				loading: "Đang tải",
				disabledAdmin: "Người quản trị đã vô hiệu hóa tính năng này",
				width: "Chiều rộng",
				height: "Chiều cao"
			},
			inlineFieldEdit: {
				editMe: "Chỉnh sửa tôi!"
			},
			builderPanel: {
				panelHeader: "Bộ thiết lập %TPL_NAME%",
				buttonSaving: "Đang lưu",
				buttonSaved: "Đã lưu",
				buttonShare: "Chia sẻ",
				buttonSettings: "Thiết lập",
				buttonHelp: "Trợ giúp",
				buttonPreview: "Xem Trực tiếp",
				tooltipFirstSave: "á»‡_This isn't available until you save_á».",
				tooltipNotShared: "á»‡_This isn't available until you share_á».",
				noPendingChange: "Không có thay đổi chờ xử lý",
				unSavedChangePlural: "Thay đổi chờ xử lý",
				closeWithPendingChange: "Bạn có chắc chắn muốn xác nhận hành động này không? Các thay đổi của bạn sẽ bị mất.",
				saveError: "Lưu thất bại, vui lòng thử lại",
				shareStatus1: "Ứng dụng vẫn chưa được lưu",
				shareStatus2: "Ứng dụng được chia sẻ công khai",
				shareStatus3: "Ứng dụng được chia sẻ trong tổ chức",
				shareStatus4: "Ứng dụng không được chia sẻ"
			},
			saveError: {
				title: "á»‡_Error saving the application_á»",
				err1Div1: "á»‡_The application can't be saved because you already have another item with the same name (see your <a class='linkagolroot' target='_blank'>content folder</a>)_á».",
				err1Div2: "á»‡_Please modify the title of your application and then save it_á».",
				btnOk: "á»‡_Edit the application title_á»"
			},
			share: {
				firstSaveTitle: "Đã lưu ứng dụng thành công",
				firstSaveHeader: "Ứng dụng của bạn hiện đã được lưu trong %PORTAL% nhưng vẫn chưa được chia sẻ.",
				firstSavePreview: "Xem trước",
				firstSaveShare: "Chia sẻ",
				firstSaveA1: "Nếu bạn không quen với %PORTAL% hoặc muốn có một phím tắt để truy cập vào giao diện bộ dựng, bạn có thể lưu liên kết sau đây: %LINK1%",
				firstSaveA1bis: "Bạn cũng có thể tìm thấy ứng dụng trong <a href='%LINK2%' target='_blank'>thư mục nội dung%PORTAL%</a>.",
				shareTitle: "Chia sẻ ứng dụng của bạn",
				sharePrivateHeader: "Ứng dụng của bạn không được chia sẻ, bạn có muốn chia sẻ không?",
				sharePrivateBtn1: "Chia sẻ công khai",
				sharePrivateBtn2: "Chia sẻ với Tổ chức của tôi",
				sharePrivateWarning: "Chia sẻ %WITH% đã bị vô hiệu hóa vì bạn không phải là chủ sở hữu <a href='%LINK%' target='_blank'>bản đồ web</a>.",
				sharePrivateWarningWith1: "công khai",
				sharePrivateWarningWith2: "công khai và với Tổ chức",
				sharePrivateProgress: "Đang tiến hành chia sẻ...",
				sharePrivateErr: "Chia sẻ thất bại, thử lại hoặc",
				sharePrivateOk: "Chia sẽ cập nhật thành công, đang tải...",
				shareHeader1: "Có thể truy cập <strong>ứng dụng của bạn công khai</strong>.",
				shareHeader2: "Các thành viên trong tổ chức của bạn có thể truy cập ứng dụng (yêu cầu đăng nhập).",
				shareLinkCopy: "Sao chép",
				shareLinkCopied: "Đã sao chép",
				shareQ0: "á»‡_How do I embed the application in a web page_á»?",
				shareQ1Opt1: "Làm cách nào để giữ ứng dụng riêng tư?",
				shareQ1Opt2: "Làm cách nào để giữ ứng dụng riêng tư hoặc chia sẻ công khai?",
				shareA1: "Sử dụng %SHAREIMG% trên <a href='%LINK1%' target='_blank'>trang mục ứng dụng</a>.",
				shareQ2bis: "Làm cách nào để quay lại giao diện bộ dựng?",
				shareA2div1: "Lưu và sử dụng lại liên kết sau %LINK1% hoặc sử dụng <a href='%LINK2%' target='_blank'>trang mục ứng dụng</a>.",
				shareA2div2: "Là chủ sở hữu của ứng dụng, khi bạn đăng nhập vào %PORTAL%, ứng dụng bao gồm một nút mở bộ dựng:",				
				shareQ3: "Dữ liệu được lưu trữ ở đâu?",
				shareA3: "Dữ liệu và cấu hình %TPL_NAME% được lưu trữ trong <a href='%LINK2%' target='_blank'>mục ứng dụng trang web này</a>. Nếu bạn sử dụng nhập từ Flickr, Picasa, Facebook hoặc YouTube, thì ảnh và video không bị trùng lặp trong %PORTAL%."
			},
			settings: {
				header: "Thiết lập",
				tabError: "Vui lòng kiểm tra lỗi trong tất cả các tab"
			},
			settingsLayout: {
				title: "Bố cục",
				explain: "Bạn muốn sử dụng bố cục nào?",
				explainInit: "Bạn có thể thay đổi bố cục bất kỳ lúc nào từ hộp thoại thiết đặt.",
				viewExample: "Xem ví dụ trực tiếp"
			},
			settingsTheme: {
				title: "Chủ đề"
			},
			settingsHeader: {
				title: "Đầu mục",
				logoEsri: "Logo Esri",
				logoNone: "Không có logo",
				logoCustom: "Logo tùy chỉnh",
				logoCustomPlaceholder: "URL (tối đa 250x50 điểm ảnh)",
				logoCustomTargetPlaceholder: "Bấm vào liên kết",
				logoSocialExplain: "Tùy chỉnh liên kết đầu mục.",
				logoSocialText: "Văn bản",
				logoSocialLink: "Liên kết",
				lblSmallHeader: "á»‡_Use compact header (no subtitle)_á»"
			},
			header: {
				title: "á»‡_Edit the title of your %TPL_NAME%_á»",
				subtitle: "á»‡_Edit the subtitle of your %TPL_NAME%_á»"
			}
		}
	})
);
