import { useCallback, useEffect } from 'react';
import { useImmerState } from '.';

interface IThemeColors {
  name: string;
  defaultColors: string;
  currentColors: string;
}
interface ICssItem {
  source: string;
  fileName: string;
  matchColors: string[];
}
export function useTheme() {
  const [styleData, setStyleData] = useImmerState<ICssItem[]>([]);
  const [colors, setColors] = useImmerState<IThemeColors[]>([
    {
      name: 'primary',
      defaultColors: '#5584ff',
      currentColors: '#18263C'
    }
  ]);

  // 初始主题色
  useEffect(() => {
    if (window.CSS_EXTRACT_COLOR_PLUGIN) {
      setStyleData(() => window.CSS_EXTRACT_COLOR_PLUGIN!);
    } else {
      document.onreadystatechange = () => {
        if (window.CSS_EXTRACT_COLOR_PLUGIN) {
          setStyleData(() => window.CSS_EXTRACT_COLOR_PLUGIN!);
        }
      };
    }
  }, [setStyleData]);

  // 
  useEffect(() => {
    const styleText = colors.map(color => {
      return styleData
        .filter(item => item.matchColors.includes(color.defaultColors))
        .map(item => {
          return replaceColor(item.source, color.defaultColors, color.currentColors);
        }).join('');
    }).join(';');
    const style = insertStyle(styleText);

    return () => {
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };

  }, [colors, styleData]);


}

function replaceColor(source: string, color: string, replaceColor: string) {
  return source.replace(
    new RegExp(`(:.*?\\s*)(${color})(\\b.*?)(?=})`, 'mig'),
    group => {
      return group.replace(new RegExp(`${color}`, 'mig'), replaceColor);
    }
  );
}

function insertStyle(styleText: string) {
  const style = document.createElement('style');
  style.innerHTML = styleText;
  document.body.appendChild(style);
  return style;
}
