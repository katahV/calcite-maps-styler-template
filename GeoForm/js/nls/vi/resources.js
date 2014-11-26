﻿define(
     ({
        map: {
            error: "Không thể tạo bản đồ"
        },
        onlineStatus: {
            offline: "Bạn hiện đang làm việc ngoại tuyến. Biểu mẫu đã đệ trình sẽ được lưu cục bộ cho đến khi có kết nối tới máy chủ.",
            reconnecting: "Đang kết nối lại&hellip;",
            pending: "${total} bản chỉnh sửa đang chờ xử lý sẽ được gửi khi kết nối mạng được thiết lập lại."
        },
        configure: {
            mapdlg: {
                items: {
                    organizationLabel: "Tổ chức của tôi",
                    onlineLabel: "ArcGIS Online",
                    contentLabel: "Nội dung của tôi",
                    favoritesLabel: "Yêu thích của tôi"
                },
                title: "Chọn Bản đồ Web",
                searchTitle: "Tìm kiếm",
                ok: "Ok",
                cancel: "Hủy",
                placeholder: "Nhập cụm từ tìm kiếm"
            },
            groupdlg: {
                items: {
                    organizationLabel: "Tổ chức của tôi",
                    onlineLabel: "ArcGIS Online",
                    contentLabel: "Nội dung của tôi",
                    favoritesLabel: "Yêu thích của tôi"
                },
                title: "Chọn Nhóm",
                searchTitle: "Tìm kiếm",
                ok: "Ok",
                cancel: "Hủy",
                placeholder: "Nhập cụm từ tìm kiếm"
            },
            sharedlg: {
                items: {
                },
                mailtoLinkDescription: "Dưới đây là liên kết đến GeoForm"
            }
        },
        user: {
            mgrs: "MGRS",
            usng: "USNG",
            utm: "UTM",
            utm_northing: "Hướng bắc",
            utm_easting: "Hướng đông",
            utm_zone_number: "Số khu vực",
            geoFormGeneralTabText: "1. Nhập Thông tin",
            locationInformationText: "2. Chọn Vị trí",
            submitInformationText: "3. Hoàn thành Biểu mẫu",
            submitInstructions: "Thêm thông tin này vào bản đồ.",
            myLocationText: "Vị trí hiện tại",
            locationDescriptionForMoreThanOneOption: "Chỉ định vị trí cho mục nhập này bằng cách bấm/chạm vào bản đồ hoặc bằng cách sử dụng một trong các tùy chọn sau.",
            locationDescriptionForOneOption: "Chỉ định vị trí cho mục nhập này bằng cách bấm/chạm vào bản đồ hoặc bằng cách sử dụng tùy chọn sau.",
            locationDescriptionForNoOption: "Chỉ định vị trí cho mục nhập này bằng cách bấm/chạm vào bản đồ.",
            addressText: "Tìm kiếm",
            geographic: "Vĩ độ/Kinh độ",
            locationTabText: "Vị trí",
            locationPopupTitle: "Vị trí",
            submitButtonText: "Đệ trình Mục nhập",
            submitButtonTextLoading: "Đang gửi&hellip;",
            formValidationMessageAlertText: "Các trường sau thì bắt buộc:",
            selectLocation: "Vui lòng chọn một vị trí để gửi.",
            emptylatitudeAlertMessage: "Vui lòng nhập tọa độ ${openLink}vĩ độ${closeLink}.",
            emptylongitudeAlertMessage: "Vui lòng nhập tọa độ ${openLink}kinh độ${closeLink}.",
            shareUserTitleMessage: "Cảm ơn sự đóng góp của bạn!",
            entrySubmitted: "Mục nhập của bạn đã được đệ trình lên bản đồ.",
            shareThisForm: "Chia sẻ Biểu mẫu Này",
            shareUserTextMessage: "Thông báo cho người khác đóng góp bằng cách sử dụng các tùy chọn sau.",
            addAttachmentFailedMessage: "Không thể thêm tệp đính kèm vào lớp",
            addFeatureFailedMessage: "Không thể thêm đối tượng vào lớp",
            noLayerConfiguredMessage: "Đã xảy ra lỗi khi tải hoặc tìm lớp đối tượng có thể chỉnh sửa. Để hiển thị biểu mẫu và bắt đầu thu thập nội dung đệ trình, thêm Lớp Đối tượng có thể chỉnh sửa vào Bản đồ web.",
            placeholderLatitude: "Vĩ độ (Y)",
            placeholderLongitude: "Kinh độ (X)",
            latitude: "Vĩ độ",
            longitude: "Kinh độ",
            findMyLocation: "Định vị tôi",
            finding: "Đang định vị&hellip;",
            backToTop: "Quay lại đầu trang",
            addressSearchText: "Biểu mẫu đã đệ trình của bạn sẽ xuất hiện ở đây. Bạn có thể kéo biểu tượng hình ghim để thay đổi vị trí.",
            shareModalFormText: "Liên kết Biểu mẫu",
            close: "Đóng",
            locationNotFound: "Không thể tìm thấy vị trí.",
            setLocation: "Thiết lập Vị trí",
            find: "Tìm địa chỉ hoặc địa điểm",
            attachment: "Phần đính kèm",
            toggleDropdown: "Chuyển đổi Danh sách xổ xuống",
            invalidString: "Vui lòng nhập giá trị hợp lệ.",
            invalidSmallNumber: "Vui lòng nhập giá trị ${openStrong}integer${closeStrong} hợp lệ trong khoảng từ -32768 đến 32767.",
            invalidNumber: "Vui lòng nhập giá trị ${openStrong}integer${closeStrong} hợp lệ trong khoảng từ -2147483648 đến 2147483647.",
            invalidFloat: "Vui lòng nhập giá trị ${openStrong}điểm fload${closeStrong} hợp lệ.",
            invalidDouble: "Vui lòng nhập giá trị ${openStrong}double${closeStrong} hợp lệ.",
            invalidLatLong: "Vui lòng nhập tọa độ vĩ độ và kinh độ hợp lệ.",
            invalidUTM: "Vui lòng nhập tọa độ UTM hợp lệ.",
            invalidUSNG: "Vui lòng nhập tọa độ USNG hợp lệ.",
            invalidMGRS: "Vui lòng nhập tọa độ MGRS hợp lệ.",
            geoformTitleText: "GeoForm",
            domainDefaultText: "Chọn&hellip;",
            applyEditsFailedMessage: "Rất tiếc, mục nhập của bạn không thể đệ trình được. Vui lòng thử lại.",
            requiredFields: "Có một số lỗi. Vui lòng sửa chúng dưới đây.",
            requiredField: "(bắt buộc)",
            error: "Lỗi",
            textRangeHintMessage: "${openStrong}Gợi ý:${closeStrong} Giá trị tối thiểu ${minValue} và Giá trị tối đa ${maxValue}",
            dateRangeHintMessage: "${openStrong}Gợi ý:${closeStrong} Ngày tối thiểu ${minValue} và Ngày tối đa ${maxValue}",
            remainingCharactersHintMessage: "Còn ${value} ký tự"
        },
        builder: {
            invalidUser: "Rất tiếc, bạn không có quyền xem mục này",
            invalidWebmapSelectionAlert: "Bản đồ web đã chọn không chứa một lớp hợp lệ để sử dụng. Vui lòng thêm một Lớp đối tượng có thể chỉnh sửa vào bản đồ web của bạn để tiếp tục.",
            invalidWebmapSelectionAlert2: "Để biết thêm thông tin, vui lòng tham khảo ${openLink}Dịch vụ Đối tượng là gì?${closeLink}",
            selectFieldsText: "Chọn các Trường Biểu mẫu",
            selectThemeText: "Chọn Chủ đề Biểu mẫu",
            webmapText: "Bản đồ web",
            layerText: "Lớp",
            detailsText: "Chi tiết",
            fieldsText: "Trường",
            styleText: "Kiểu",
            optionText: "Tùy chọn",
            previewText: "Xem trước",
            publishText: "Xuất bản",
            optionsApplicationText: "Tùy chọn",
            titleText: "Bộ thiết lập",
            descriptionText: "GeoForm là một mẫu có thể cấu hình để chỉnh sửa dữ liệu trên biểu mẫu của ${link1}Dịch vụ Đối tượng${closeLink}. Ứng dụng này cho phép người dùng nhập dữ liệu thông qua một biểu mẫu thay vì cửa sổ pop-up của bản đồ khi tận dụng sức mạnh của ${link2}Bản đồ Web${closeLink} và Dịch vụ Đối tượng có thể chỉnh sửa. Sử dụng các bước sau để tùy chỉnh và triển khai GeoForm của bạn.",
            btnPreviousText: "Trước",
            btnNextText: "Tiếp",
            webmapTabTitleText: "Chọn một Bản đồ web",
            viewWebmap: "Xem bản đồ web",
            webmapDetailsText: "Bản đồ web được chọn là ${webMapTitleLink}${webMapTitle}${closeLink}. Để chọn một bản đồ web khác, vui lòng bấm vào nút 'Chọn Bản đồ web'",
            btnSelectWebmapText: "Chọn Bản đồ web",
            btnSelectWebmapTextLoading: "Đang tải&hellip;",
            layerTabTitleText: "Chọn Lớp có thể chỉnh sửa được",
            selectLayerLabelText: "Lớp",
            selectLayerDefaultOptionText: "Chọn Lớp",
            detailsTabTitleText: "Chi tiết Biểu mẫu",
            detailTitleLabelText: "Tiêu đề",
            detailLogoLabelText: "Hình ảnh Logo",
            descriptionLabelText: "Chi tiết và Hướng dẫn về Biểu mẫu",
            fieldDescriptionLabelText: "Văn bản Trợ giúp (tùy chọn)",
            fieldTabFieldHeaderText: "Trường",
            fieldTabLabelHeaderText: "Nhãn",
            fieldTabDisplayTypeHeaderText: "Hiển thị như",
            fieldTabOrderColumnText: "Thứ tự",
            fieldTabVisibleColumnText: "Đã bật",
            selectMenuOption: "Chọn Menu",
            selectRadioOption: "Nút Radio",
            selectTextOption: "Văn bản",
            selectDateOption: "Trình chọn Ngày",
            selectRangeOption: "Touch-Spinner",
            selectCheckboxOption: "Hộp ô vuông",
            selectMailOption: "Email",
            selectUrlOption: "URL",
            selectTextAreaOption: "Vùng Văn bản",
            previewApplicationText: "Xem trước ứng dụng",
            saveApplicationText: "Lưu ứng dụng",
            saveText: "Lưu",
            toggleNavigationText: "Chuyển đổi điều hướng",
            formPlaceholderText: "Biểu mẫu của tôi",
            shareBuilderInProgressTitleMessage: "Xuất bản GeoForm",
            shareBuilderProgressBarMessage: "Vui lòng đợi&hellip;",
            shareBuilderTitleMessage: "Thành công! Đã lưu mục",
            shareBuilderTextMessage: "Bạn có thể bắt đầu thu thập thông tin bằng cách chia sẻ với những người khác",
            shareModalFormText: "Liên kết Biểu mẫu",
            shareBuilderSuccess: "GeoForm của bạn đã được cập nhật & xuất bản!",
            geoformTitleText: "Biểu mẫu Geo",
            layerTabText: "GeoForm sẽ được xây dựng từ lớp này. Lớp này phải là một dịch vụ đối tượng hỗ trợ cho việc chỉnh sửa cùng với quyền chia sẻ phù hợp với người xem của bạn.",
            detailsTabText: "Sử dụng các hộp Chi tiết Mẫu bên dưới để tùy chỉnh Tiêu đề, thêm logo tùy chỉnh và cung cấp mô tả ngắn cho đối tượng GeoForm của bạn. Trong mô tả bạn có thể thêm liên kết tới các tài nguyên khác, thông tin liên hệ và thậm chí hướng người xem của bạn đến với một ứng dụng lập bản đồ web có tất cả dữ liệu đã thu thập bằng GeoForm.",
            fieldsTabText: "Tại đây, bạn có thể chọn những trường nào sẽ hiển thị cho người xem GeoForm của mình, chỉnh sửa Nhãn mà họ sẽ nhìn thấy và thêm một Mô tả ngắn để giúp nhập dữ liệu.",
            styleTabText: "Tạo kiểu cho GeoForm của bạn bằng cách sử dụng các chủ đề dưới đây dựa trên tùy chọn của bạn.",
            publishTabText: "Nếu bạn kết thúc tùy chỉnh GeoForm của bạn, hãy lưu ứng dụng và bắt đầu chia sẻ với người xem của bạn. Bạn luôn có thể quay lại bộ thiết lập này và tiếp tục tùy chỉnh dựa trên ý kiến phản hồi.",
            headerSizeLabel:"Kích thước Đầu trang",
            smallHeader: "Sử dụng Đầu trang nhỏ",
            bigHeader: "Sử dụng Đầu trang Lớn",
            pushpinText: "Đinh ghim",
            doneButtonText: "Lưu và Thoát",
            fieldTabPlaceHolderHeaderText: "Gợi ý (tùy chọn)",
            enableAttachmentLabelText: "${openStrong}Bật Phần đính kèm${closeStrong}",
            enableAttachmentLabelHint: "Bạn có thể bật/tắt phần đính kèm tại đây",
            attachmentIsRequiredLabelText: "${openStrong}Yêu cầu Phần đính kèm${closeStrong}",
            attachmentIsRequiredLabelHint: "Nếu cần, người dùng có thể cần phải nhập phần đính kèm.",
            attachmentLabelText: "Nhãn Nút Phần đính kèm",
            attachmentLabelHint: "Đây là văn bản sẽ xuất hiện bên cạnh Nút Phần đính kèm. Bạn có thể sử dụng không gian này để mô tả nội dung mà bạn muốn người xem của mình đính kèm thêm vào (ảnh, video, tài liệu, v.v.), định dạng tệp mà bạn yêu cầu (.jpeg, .png, .docx, .pdf, v.v.) và bất kỳ hướng dẫn bổ sung nào",
            attachmentDescription: "Mô tả Phần đính kèm",
            attachmentHint: "Nếu cần, bạn có thể cung cấp hướng dẫn bổ sung về phần đính kèm tại đây.",
            jumbotronDescription: "Sử dụng đầu đề lớn hoặc nhỏ cho biểu mẫu của bạn. Đầu mục lớn có thể giúp xác định mục đích của ứng dụng nhưng sẽ chiếm nhiều không gian trên màn hình của bạn",
            shareGeoformText: "Chia sẻ Geoform",
            shareDescription: "Bảng điều khiển chia sẻ giúp người xem của bạn dễ dàng chia sẻ GeoForm với người cộng tác khác sau khi họ đã đệ trình - có thể tắt tùy chọn này bất kỳ lúc nào.",
            defaultMapExtent: "Phạm vi Bản đồ mặc định",
            defaultMapExtentDescription: "Bản đồ sẽ thiết lập lại phạm vi mặc định trong bản đồ web của bạn sau khi bạn đệ trình - có thể tắt tùy chọn này bất kỳ lúc nào.",
            pushpinOptionsDescription: "Chọn từ nhiều màu cho đinh ghim bản đồ. Đinh ghim phải khác với biểu tượng bản đồ để giúp người dùng xác định nội dung đệ trình của họ lên bản đồ",
            selectLocationText: "Chọn vị trí theo",
            myLocationText: "Vị trí của tôi",
            searchText: "Tìm kiếm",
            coordinatesText: "Tọa độ Vĩ độ và Kinh độ",
            usng: "Tọa độ USNG",
            mgrs: "Tọa độ MGRS",
            utm: "Tọa độ UTM",
            selectLocationSDescription: "Cho phép người dùng chọn vị trí bằng cách sử dụng những phương pháp này.",
            dragTooltipText:"Kéo trường mà bạn muốn nó xuất hiện",
            showHideLayerText:"Hiện/Ẩn Lớp",
            showHideLayerHelpText:"Bạn có thể cấu hình GeoForm để Hiện/Ẩn Lớp"
        }
    })
);