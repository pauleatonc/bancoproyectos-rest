(function ($) {
  $(document).ready(function () {
    // Obtener los elementos de los campos de selección de región y comuna
    var regionSelect = $('#id_region');
    var comunaSelect = $('#id_comuna');

    // Manejar el evento de cambio en el campo de selección de región
    regionSelect.change(function () {
      // Obtener el ID de la región seleccionada
      var regionId = $(this).val();

      // Realizar una solicitud AJAX para obtener las comunas de la región seleccionada
      $.ajax({
        url: '/api/get_comunas/',  // Reemplaza esta URL con la URL de tu vista de API para obtener las comunas
        data: { region_id: regionId },
        dataType: 'json',
        success: function (data) {
          // Limpiar las opciones actuales del campo de selección de comuna
          comunaSelect.empty();

          // Agregar las nuevas opciones de comuna al campo de selección
          $.each(data, function (key, value) {
            comunaSelect.append($('<option></option>').attr('value', value.id).text(value.nombre));
          });
        }
      });
    });
  });
})(django.jQuery);