import { Injectable } from '@angular/core';
import {enumType} from './data';

@Injectable({
  providedIn: 'root'
})
export class SnippetService {

  constructor() { }

  applySnippetEnumType(model: any) {
    if (model == null) {
      return model;
    }

    if (model.plots) {
      for (const plot of model.plots) {
        if (plot.type) {
          plot.type = plot.type + '::PlotType';
        }

        if (plot.encodings) {
          const encodings = plot.encodings;

          if (encodings.details) {
            if (encodings.details.length > 0) {
              for (const detail of encodings.details) {
                if (detail.excludeNulls != null) {
                  detail.excludeNulls = detail.excludeNulls + '::ExcludeNulls';
                }
              }
            } else {
              if (encodings.details.excludeNulls != null) {
                encodings.details.excludeNulls = encodings.details.excludeNulls + '::ExcludeNulls';
              }
            }
          }
        }

        if (plot.config) {
          const config = plot.config;

          if (config.axisMode) {
            config.axisMode = config.axisMode + '::AxisMode';
          }
          if (config.clippingMode) {
            config.clippingMode = config.clippingMode + '::ClippingMode';
          }
          if (config.lineAspect) {
            config.lineAspect = config.lineAspect + '::LineAspect';
          }
          if (config.showNulls) {
            config.showNulls = config.showNulls + '::ShowNulls';
          }
          if (config.symbols != null) {
            config.symbols = config.symbols + '::Symbols';
          }
          if (config.swapAxes != null) {
            config.swapAxes = config.swapAxes + '::SwapAxes';
          }

          if (config.text != null) {
            const text = config.text;

            if (text.linePosition) {
              text.linePosition = text.linePosition + '::LinePosition';
            }
          }
          if (config.updateAnimation != null) {
            const updateAnimation = config.updateAnimation;
            if (updateAnimation.mode) {
              updateAnimation.mode = updateAnimation.mode + '::AnimationMode';
            }

            if (updateAnimation.easing) {
              updateAnimation.easing = updateAnimation.easing + '::AnimationEasing';
            }
          }

        }
      }

    }

    if (model.config) {
      const config = model.config;

      if (config.palette) {
        config.palette = model.config.palette + '::Palette';
      }

      if (config.legend) {
        const legend = config.legend;

        if (legend.orientation) {
          legend.orientation = legend.orientation + '::Orientation';
        }

        if (legend.position) {
          legend.position = legend.position + '::Position';
        }
      }

      if (config.selectionMode != null) {
        config.selectionMode = config.selectionMode + '::SelectionMode';
      }
    }

    return model;
  }

  getEnumType(enumString: string) {
    const dataModel = enumType;
    if (dataModel[enumString]) {
      return dataModel[enumString];
    }
  }

}
